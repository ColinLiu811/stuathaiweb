// StuAth.ai - AI Scheduler for Student Athletes

// The week is stored under these fixed keys and translated only when it is shown,
// so switching language after generating keeps the week (it used to come back empty).
const DAY_KEYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

class StuAthScheduler {
    constructor() {
        this.userData = {};
        this.schedule = {};
        this.workoutPlans = {};
        this.studyPlans = {};
        this.tips = {};
        this.currentLanguage = 'en';
        this.initializeEventListeners();
        this.loadUserData();
        this.loadLanguagePreference();
    }

    initializeEventListeners() {
        document.getElementById('scheduleForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // Dark mode toggle
        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Language selector
        document.getElementById('languageSelector').addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });
    }

    // Translation functions
    translate(key) {
        return translations[this.currentLanguage]?.[key] || translations['en'][key] || key;
    }

    changeLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('stuath_language', lang);
        document.documentElement.lang = lang;
        this.updatePageLanguage();
    }

    updatePageLanguage() {
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = this.translate(key);
        });

        // Update placeholders
        document.querySelectorAll('[data-placeholder]').forEach(element => {
            const key = element.getAttribute('data-placeholder');
            const translatedText = this.translate(key);
            // Replace \n with actual newlines for textarea placeholders
            element.placeholder = translatedText.replace(/\\n/g, '\n');
        });

        // Update select options
        document.querySelectorAll('select option[data-translate]').forEach(option => {
            const key = option.getAttribute('data-translate');
            option.textContent = this.translate(key);
        });

        // Update language selector options
        const langSelector = document.getElementById('languageSelector');
        if (langSelector) {
            langSelector.value = this.currentLanguage;
        }

        // Update dynamic content if schedule is already generated
        if (this.schedule && Object.keys(this.schedule).length > 0) {
            // Study plan and tip headings are translated when generated; both are fixed lists, so rebuild them
            this.studyPlans = this.generateStudyPlans();
            this.tips = this.generateSuccessTips();
            this.displaySchedule();
            this.displayWorkoutPlans();
            this.displayStudyPlans();
            this.displaySuccessTips();
        }
    }

    loadLanguagePreference() {
        const savedLanguage = localStorage.getItem('stuath_language');
        if (savedLanguage && translations[savedLanguage]) {
            this.currentLanguage = savedLanguage;
            document.getElementById('languageSelector').value = savedLanguage;
        } else {
            // Detect browser language
            const browserLang = navigator.language.split('-')[0];
            if (translations[browserLang]) {
                this.currentLanguage = browserLang;
                document.getElementById('languageSelector').value = browserLang;
            }
        }
        document.documentElement.lang = this.currentLanguage;
        this.updatePageLanguage();
    }

    handleFormSubmission() {
        // Collect form data
        this.userData = this.collectFormData();
        
        // Show loading screen
        this.showLoadingScreen();
        
        // Simulate AI processing time
        setTimeout(() => {
            this.generateSchedule();
            this.showResults();
        }, 2000);
    }

    collectFormData() {
        const form = document.getElementById('scheduleForm');
        const formData = new FormData(form);
        
        const data = {
            name: formData.get('name'),
            sport: formData.get('sport'),
            classes: this.parseTextArea(formData.get('classes')),
            studyHours: parseInt(formData.get('studyHours')),
            academicLevel: formData.get('academicLevel'),
            practices: this.parseTextArea(formData.get('practices')),
            games: this.parseTextArea(formData.get('games')),
            trainingLevel: formData.get('trainingLevel'),
            goals: formData.get('goals'),
            wakeTime: formData.get('wakeTime'),
            sleepTime: formData.get('sleepTime'),
            focusAreas: formData.getAll('focusAreas')
        };

        // Save to localStorage
        localStorage.setItem('stuath_user_data', JSON.stringify(data));
        return data;
    }

    parseTextArea(text) {
        if (!text) return [];
        return text.split('\n').filter(line => line.trim() !== '');
    }

    showLoadingScreen() {
        document.getElementById('inputSection').style.display = 'none';
        document.getElementById('loadingSection').style.display = 'block';
        document.getElementById('resultsSection').style.display = 'none';
    }

    showResults() {
        document.getElementById('loadingSection').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'block';
        document.getElementById('resultsSection').classList.add('fade-in');
        
        this.displaySchedule();
        this.displayWorkoutPlans();
        this.displayStudyPlans();
        this.displaySuccessTips();
    }

    generateSchedule() {
        // Generate weekly schedule
        this.schedule = this.createWeeklySchedule();
        
        // Generate workout plans
        this.workoutPlans = this.generateWorkoutPlans();
        
        // Generate study plans
        this.studyPlans = this.generateStudyPlans();
        
        // Generate success tips
        this.tips = this.generateSuccessTips();
    }

    createWeeklySchedule() {
        const schedule = {};

        DAY_KEYS.forEach(day => {
            schedule[day] = [];
        });

        // Add classes (one line can name several days: "Math 101 - Mon/Wed/Fri 9:00 AM")
        this.userData.classes.forEach(classInfo => {
            this.parseClassSchedule(classInfo).forEach(classSchedule => {
                schedule[classSchedule.day].push({
                    time: classSchedule.time,
                    title: classSchedule.title,
                    type: 'class',
                    descriptionKey: 'academicClass'
                });
            });
        });

        // Add practices
        this.userData.practices.forEach(practice => {
            const practiceSchedule = this.parsePracticeSchedule(practice);
            if (practiceSchedule) {
                schedule[practiceSchedule.day].push({
                    time: practiceSchedule.time,
                    titleKey: 'practice',
                    type: 'practice',
                    descriptionKey: 'teamPracticeSession'
                });
            }
        });

        // Add games
        this.userData.games.forEach(game => {
            const gameSchedule = this.parseGameSchedule(game);
            if (gameSchedule) {
                schedule[gameSchedule.day].push({
                    time: gameSchedule.time,
                    title: gameSchedule.title,
                    type: 'game',
                    descriptionKey: 'competitionGame'
                });
            }
        });

        // Add study sessions
        this.addStudySessions(schedule);

        // Add workout sessions
        this.addWorkoutSessions(schedule);

        // Add rest and recovery
        this.addRestSessions(schedule);

        // Sort each day by time
        Object.keys(schedule).forEach(day => {
            schedule[day].sort((a, b) => this.compareTimes(a.time, b.time));
        });

        return schedule;
    }

    // Returns one entry per day the line names, so "Mon/Wed/Fri" gives three (it used to give Monday only)
    parseClassSchedule(classInfo) {
        // Simple parsing - in a real app, this would be more sophisticated
        const parts = classInfo.split(' - ');
        if (parts.length < 2) return [];

        const title = parts[0];
        const timeInfo = parts.slice(1).join(' - ');

        // Extract days and time
        const dayMatches = timeInfo.match(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/gi) || [];
        const timeMatch = timeInfo.match(/(\d{1,2}:\d{2}\s*(AM|PM))/i);
        if (!timeMatch) return [];

        const dayMap = { mon: 'monday', tue: 'tuesday', wed: 'wednesday', thu: 'thursday', fri: 'friday', sat: 'saturday', sun: 'sunday' };
        const days = [...new Set(dayMatches.map(d => dayMap[d.toLowerCase()]))];

        return days.map(day => ({
            day: day,
            time: timeMatch[1],
            title: title
        }));
    }

    parsePracticeSchedule(practice) {
        const timeMatch = practice.match(/(\d{1,2}:\d{2}\s*(AM|PM))/i);
        
        // Check for English day names (common in user input)
        const englishDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const englishDayMatch = englishDays.find(day => practice.match(new RegExp(day, 'i')));
        
        // Also check for translated day names
        const translatedDays = [
            this.translate('monday'), this.translate('tuesday'), this.translate('wednesday'),
            this.translate('thursday'), this.translate('friday'), this.translate('saturday'),
            this.translate('sunday')
        ];
        const translatedDayMatch = translatedDays.find(day => practice.toLowerCase().includes(day.toLowerCase()));
        
        let dayMatch = null;
        if (englishDayMatch) {
            dayMatch = DAY_KEYS[englishDays.indexOf(englishDayMatch)];
        } else if (translatedDayMatch) {
            dayMatch = DAY_KEYS[translatedDays.indexOf(translatedDayMatch)];
        }
        
        if (timeMatch && dayMatch) {
            return {
                day: dayMatch,
                time: timeMatch[1]
            };
        }
        
        return null;
    }

    parseGameSchedule(game) {
        const timeMatch = game.match(/(\d{1,2}:\d{2}\s*(AM|PM))/i);
        
        // Check for English day names (common in user input)
        const englishDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const englishDayMatch = englishDays.find(day => game.match(new RegExp(day, 'i')));
        
        // Also check for translated day names
        const translatedDays = [
            this.translate('monday'), this.translate('tuesday'), this.translate('wednesday'),
            this.translate('thursday'), this.translate('friday'), this.translate('saturday'),
            this.translate('sunday')
        ];
        const translatedDayMatch = translatedDays.find(day => game.toLowerCase().includes(day.toLowerCase()));
        
        let dayMatch = null;
        if (englishDayMatch) {
            dayMatch = DAY_KEYS[englishDays.indexOf(englishDayMatch)];
        } else if (translatedDayMatch) {
            dayMatch = DAY_KEYS[translatedDays.indexOf(translatedDayMatch)];
        }
        
        if (timeMatch && dayMatch) {
            return {
                day: dayMatch,
                time: timeMatch[1],
                title: game
            };
        }
        
        return null;
    }

    addStudySessions(schedule) {
        const studyHoursPerDay = this.userData.studyHours / 7;
        const studySessions = Math.ceil(studyHoursPerDay / 1.5); // 1.5 hour sessions
        
        DAY_KEYS.forEach(day => {
            this.generateStudyTimes(studySessions).forEach(time => {
                schedule[day].push({
                    time: time,
                    titleKey: 'studySession',
                    type: 'study',
                    hours: Math.min(1.5, studyHoursPerDay),
                    descriptionKey: 'hoursFocusedStudy'
                });
            });
        });
    }

    addWorkoutSessions(schedule) {
        const workoutDays = ['monday', 'wednesday', 'friday'];
        
        workoutDays.forEach(day => {
            const time = this.generateWorkoutTime(day);
            schedule[day].push({
                time: time,
                titleKey: 'personalWorkout',
                type: 'workout',
                descriptionKey: 'strengthConditioning'
            });
        });
    }

    addRestSessions(schedule) {
        // Add rest days
        const restDays = ['sunday'];
        
        restDays.forEach(day => {
            schedule[day].push({
                time: '10:00 AM',
                titleKey: 'restRecovery',
                type: 'rest',
                descriptionKey: 'activeRecovery'
            });
        });
    }

    // Different times for each session in a day (picking each one at random could repeat a time)
    generateStudyTimes(count) {
        const times = ['8:00 AM', '2:00 PM', '7:00 PM', '9:00 PM'];
        const extra = ['12:00 PM', '5:00 PM'];   // only when a day needs more than four sessions (over 42 hours a week)
        for (let i = times.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [times[i], times[j]] = [times[j], times[i]];
        }
        return [...times, ...extra].slice(0, count);
    }

    generateWorkoutTime(day) {
        const times = ['6:00 AM', '5:00 PM', '6:30 PM'];
        return times[Math.floor(Math.random() * times.length)];
    }

    compareTimes(timeA, timeB) {
        const parseTime = (time) => {
            const [timePart, period] = time.split(' ');
            const [hours, minutes] = timePart.split(':').map(Number);
            let hour24 = hours;
            if (period === 'PM' && hours !== 12) hour24 += 12;
            if (period === 'AM' && hours === 12) hour24 = 0;
            return hour24 * 60 + minutes;
        };
        
        return parseTime(timeA) - parseTime(timeB);
    }

    generateWorkoutPlans() {
        const sport = this.userData.sport.toLowerCase();
        const trainingLevel = this.userData.trainingLevel;
        
        const workoutTemplates = {
            basketball: {
                recreational: {
                    'Cardio & Shooting': ['10 min warm-up', '20 min shooting drills', '15 min cardio', '5 min cool-down'],
                    'Strength Training': ['Squats 3x12', 'Push-ups 3x15', 'Planks 3x30s', 'Lunges 3x10 each'],
                    'Skills Practice': ['Dribbling drills 15 min', 'Passing practice 10 min', 'Free throws 10 min']
                },
                competitive: {
                    'Intense Cardio': ['15 min warm-up', '30 min HIIT', '20 min shooting', '10 min cool-down'],
                    'Full Body Strength': ['Deadlifts 4x8', 'Bench press 4x8', 'Pull-ups 3x10', 'Core circuit 20 min'],
                    'Advanced Skills': ['Ball handling 20 min', 'Game situations 25 min', 'Free throws 15 min']
                }
            },
            football: {
                recreational: {
                    'Cardio & Agility': ['10 min warm-up', '20 min running', '15 min agility drills', '5 min cool-down'],
                    'Strength Training': ['Squats 3x12', 'Push-ups 3x15', 'Burpees 3x10', 'Planks 3x30s'],
                    'Skills Practice': ['Throwing drills 15 min', 'Catching practice 10 min', 'Footwork 10 min']
                },
                competitive: {
                    'High Intensity Training': ['15 min warm-up', '30 min sprints', '25 min agility', '10 min cool-down'],
                    'Power Training': ['Squats 4x8', 'Deadlifts 4x6', 'Bench press 4x8', 'Plyometrics 20 min'],
                    'Position-Specific': ['Throwing mechanics 20 min', 'Route running 25 min', 'Defensive drills 15 min']
                }
            }
        };

        const defaultWorkouts = {
            'Cardio & Conditioning': ['10 min warm-up', '25 min cardio', '15 min strength', '5 min cool-down'],
            'Strength Training': ['Squats 3x12', 'Push-ups 3x15', 'Planks 3x30s', 'Lunges 3x10 each'],
            'Skills & Technique': ['Warm-up 10 min', 'Skill drills 20 min', 'Practice 15 min', 'Cool-down 5 min']
        };

        const workouts = workoutTemplates[sport]?.[trainingLevel] || defaultWorkouts;
        
        return {
            monday: workouts[Object.keys(workouts)[0]],
            wednesday: workouts[Object.keys(workouts)[1]],
            friday: workouts[Object.keys(workouts)[2]]
        };
    }

    generateStudyPlans() {
        const academicLevel = this.userData.academicLevel;
        const studyHours = this.userData.studyHours;
        
        // Note: Study plan content is kept in English for now as it's detailed content
        // In a production app, these would be fully translated
        const studyStrategies = {
            highschool: {
                'Time Management': [
                    'Use a planner to track assignments',
                    'Break large projects into smaller tasks',
                    'Set specific study times each day',
                    'Avoid procrastination with the 2-minute rule'
                ],
                'Study Techniques': [
                    'Use the Pomodoro Technique (25 min study, 5 min break)',
                    'Create flashcards for memorization',
                    'Teach concepts to others',
                    'Use active recall instead of passive reading'
                ],
                'Test Preparation': [
                    'Start studying at least one week before exams',
                    'Create study guides and summaries',
                    'Practice with past exams or sample questions',
                    'Get adequate sleep before test day'
                ]
            },
            undergraduate: {
                'Advanced Study Methods': [
                    'Use spaced repetition for long-term retention',
                    'Create concept maps for complex topics',
                    'Join study groups for collaborative learning',
                    'Use office hours and TA sessions effectively'
                ],
                'Research Skills': [
                    'Learn to use academic databases',
                    'Develop critical thinking skills',
                    'Practice proper citation methods',
                    'Improve writing and presentation skills'
                ],
                'Balancing Priorities': [
                    'Prioritize assignments by due date and importance',
                    'Use time-blocking for different subjects',
                    'Take advantage of campus resources',
                    'Maintain work-life balance'
                ]
            }
        };

        const strategies = studyStrategies[academicLevel] || studyStrategies.highschool;
        
        // Translate category names
        const translatedStrategies = {};
        Object.keys(strategies).forEach(key => {
            const lookup = key.toLowerCase().replace(/\s+/g, '');
            // translate() hands back the lookup itself when no translation exists, so keep the readable heading then
            const translated = this.translate(lookup);
            const translatedKey = translated !== lookup ? translated : key;
            translatedStrategies[translatedKey] = strategies[key];
        });
        
        return translatedStrategies;
    }

    generateSuccessTips() {
        const focusAreas = this.userData.focusAreas;
        const sport = this.userData.sport;
        
        // Note: Tips content is kept in English for now as it's detailed content
        // In a production app, these would be fully translated
        const tips = {
            academic: [
                'Attend all classes and take detailed notes',
                'Communicate regularly with professors and coaches',
                'Use academic support services when needed',
                'Stay organized with digital tools and planners'
            ],
            athletic: [
                'Maintain consistent training schedule',
                'Focus on proper nutrition and hydration',
                'Get adequate sleep for recovery',
                'Listen to your body and rest when needed'
            ],
            recovery: [
                'Practice stress management techniques',
                'Maintain social connections with teammates',
                'Take time for hobbies and relaxation',
                'Seek support when feeling overwhelmed'
            ],
            social: [
                'Build relationships with teammates and classmates',
                'Participate in campus activities',
                'Maintain friendships outside of sports',
                'Communicate openly with family and friends'
            ]
        };

        // Add sport-specific tips
        const sportTips = {
            basketball: [
                'Practice shooting daily, even for just 15 minutes',
                'Work on ball handling during study breaks',
                'Watch game film to improve understanding'
            ],
            football: [
                'Focus on proper technique over intensity',
                'Study playbooks during study sessions',
                'Maintain conditioning year-round'
            ],
            soccer: [
                'Practice ball control and first touch',
                'Work on endurance through interval training',
                'Study game tactics and positioning'
            ]
        };

        const selectedTips = {};
        focusAreas.forEach(area => {
            if (tips[area]) {
                const translatedKey = this.translate(area === 'academic' ? 'academicExcellence' : 
                                                    area === 'athletic' ? 'athleticPerformance' :
                                                    area === 'recovery' ? 'recoveryWellness' : 'socialLife');
                selectedTips[translatedKey] = tips[area];
            }
        });

        // Add sport-specific tips
        if (sportTips[sport]) {
            selectedTips[this.translate('sportSpecificTips')] = sportTips[sport];
        }

        return selectedTips;
    }

    displaySchedule() {
        const scheduleContainer = document.getElementById('weeklySchedule');
        const days = DAY_KEYS;
        
        scheduleContainer.innerHTML = '';
        
        days.forEach(day => {
            const dayColumn = document.createElement('div');
            dayColumn.className = 'day-column';
            
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.textContent = this.translate(day);
            dayColumn.appendChild(dayHeader);
            
            if (this.schedule[day]) {
                this.schedule[day].forEach(item => {
                    const scheduleItem = document.createElement('div');
                    scheduleItem.className = `schedule-item ${item.type}`;
                    
                    scheduleItem.innerHTML = `
                        <div class="schedule-time">${item.time}</div>
                        <div class="schedule-title">${this.itemTitle(item)}</div>
                        <div class="schedule-description">${this.itemDescription(item)}</div>
                    `;
                    
                    dayColumn.appendChild(scheduleItem);
                });
            }
            
            scheduleContainer.appendChild(dayColumn);
        });
    }

    // A block's words in the current language: generated blocks keep a translation key, typed ones their own text
    itemTitle(item) {
        return item.titleKey ? this.translate(item.titleKey) : item.title;
    }

    itemDescription(item) {
        if (!item.descriptionKey) return item.description || '';
        const text = this.translate(item.descriptionKey);
        return item.hours !== undefined ? `${item.hours} ${text}` : text;
    }

    displayWorkoutPlans() {
        const container = document.getElementById('workoutPlans');
        container.innerHTML = '';
        
        Object.keys(this.workoutPlans).forEach(day => {
            const workoutCard = document.createElement('div');
            workoutCard.className = 'workout-card';
            
            workoutCard.innerHTML = `
                <h4>${this.translate(day)} ${this.translate('workout')}</h4>
                <ul class="exercise-list">
                    ${this.workoutPlans[day].map(exercise => `<li>${exercise}</li>`).join('')}
                </ul>
            `;
            
            container.appendChild(workoutCard);
        });
    }

    displayStudyPlans() {
        const container = document.getElementById('studyPlans');
        container.innerHTML = '';
        
        Object.keys(this.studyPlans).forEach(category => {
            const studyCard = document.createElement('div');
            studyCard.className = 'study-card';
            
            studyCard.innerHTML = `
                <h4>${category}</h4>
                <ul class="study-tips">
                    ${this.studyPlans[category].map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            `;
            
            container.appendChild(studyCard);
        });
    }

    displaySuccessTips() {
        const container = document.getElementById('successTips');
        container.innerHTML = '';
        
        Object.keys(this.tips).forEach(category => {
            const tipCard = document.createElement('div');
            tipCard.className = 'tip-card';
            
            const icon = this.getCategoryIcon(category);
            
            tipCard.innerHTML = `
                <h4><i class="${icon}"></i> ${category}</h4>
                <ul class="tip-list">
                    ${this.tips[category].map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            `;
            
            container.appendChild(tipCard);
        });
    }

    getCategoryIcon(category) {
        // Match translated category names to icons
        const categoryLower = category.toLowerCase();
        if (categoryLower.includes('academic') || categoryLower.includes('académique') || categoryLower.includes('学术')) {
            return 'fas fa-graduation-cap';
        } else if (categoryLower.includes('athletic') || categoryLower.includes('athlétique') || categoryLower.includes('运动')) {
            return 'fas fa-trophy';
        } else if (categoryLower.includes('recovery') || categoryLower.includes('récupération') || categoryLower.includes('恢复')) {
            return 'fas fa-heart';
        } else if (categoryLower.includes('social') || categoryLower.includes('社交')) {
            return 'fas fa-users';
        } else if (categoryLower.includes('sport') || categoryLower.includes('运动')) {
            return 'fas fa-dumbbell';
        }
        return 'fas fa-lightbulb';
    }

    loadUserData() {
        const savedData = localStorage.getItem('stuath_user_data');
        if (savedData) {
            this.userData = JSON.parse(savedData);
            this.populateForm();
        }

        // Load dark mode preference
        this.loadDarkModePreference();
    }

    toggleDarkMode() {
        const body = document.body;
        const darkModeIcon = document.getElementById('darkModeIcon');
        
        body.classList.toggle('dark-mode');
        
        // Update icon
        if (body.classList.contains('dark-mode')) {
            darkModeIcon.className = 'fas fa-sun';
        } else {
            darkModeIcon.className = 'fas fa-moon';
        }
        
        // Save preference
        localStorage.setItem('stuath_dark_mode', body.classList.contains('dark-mode'));
    }

    loadDarkModePreference() {
        const darkModeEnabled = localStorage.getItem('stuath_dark_mode');
        const darkModeIcon = document.getElementById('darkModeIcon');
        
        // Default to dark mode if no preference is saved
        if (darkModeEnabled === null || darkModeEnabled === 'true') {
            document.body.classList.add('dark-mode');
            darkModeIcon.className = 'fas fa-sun';
            // Save the default preference
            localStorage.setItem('stuath_dark_mode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            darkModeIcon.className = 'fas fa-moon';
        }
    }

    populateForm() {
        if (!this.userData) return;
        
        Object.keys(this.userData).forEach(key => {
            const value = this.userData[key];
            const checkboxes = document.querySelectorAll(`input[type="checkbox"][name="${key}"]`);
            if (checkboxes.length) {
                // Focus areas: no element has that id, so they were never restored before
                checkboxes.forEach(checkbox => {
                    checkbox.checked = Array.isArray(value) && value.includes(checkbox.value);
                });
                return;
            }
            const element = document.getElementById(key);
            if (element) {
                // Classes, practices and games are saved as lists: put them back one per line
                // (assigning the list joined it with commas, so only the first line was read)
                element.value = Array.isArray(value) ? value.join('\n') : value;
            }
        });
    }
}

// Tab functionality
function showTab(tabName) {
    // Hide all tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab pane
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Export functionality
function exportSchedule() {
    const scheduleData = {
        userData: window.stuAthScheduler.userData,
        // The week is stored with translation keys; write the words out so the file reads on its own
        schedule: Object.fromEntries(Object.entries(window.stuAthScheduler.schedule).map(([day, items]) => [
            day,
            items.map(item => ({
                time: item.time,
                title: window.stuAthScheduler.itemTitle(item),
                type: item.type,
                description: window.stuAthScheduler.itemDescription(item)
            }))
        ])),
        workoutPlans: window.stuAthScheduler.workoutPlans,
        studyPlans: window.stuAthScheduler.studyPlans,
        tips: window.stuAthScheduler.tips
    };
    
    const dataStr = JSON.stringify(scheduleData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'stuath_schedule.json';
    link.click();
}

// Regenerate functionality
function regenerateSchedule() {
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('inputSection').style.display = 'block';
    window.scrollTo(0, 0);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.stuAthScheduler = new StuAthScheduler();
});
