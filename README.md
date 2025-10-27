# StuAthAI - Scheduler for Student Athletes

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/stuathaibeta1.svg)](https://github.com/yourusername/stuathaibeta1/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/stuathaibeta1.svg)](https://github.com/yourusername/stuathaibeta1/network)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/stuathaibeta1.svg)](https://github.com/yourusername/stuathaibeta1/issues)

StuAthAI is an intelligent scheduling application designed specifically for student athletes who need to balance their academic commitments with their athletic training and competitions.
Note: the stars, forks, and issues repoes are currently not active.

## Live Demo

[Try StuAth.ai Live Demo](https://yourusername.github.io/stuathaibeta1/) (Currently not active)

## Screenshots

![StuAthAI Interface](https://via.placeholder.com/800x400/667eea/ffffff?text=StuAth.ai+Interface) (currently not active)
*Modern, responsive interface with dark mode support*

## Features

### Core Functionality
- **Smart Scheduling**: AI-like Algorithm that creates personalized weekly schedules
- **Academic Integration**: Incorporates class schedules, study time, and academic goals
- **Athletic Planning**: Manages practice schedules, games, and training sessions
- **Workout Plans**: Generates sport-specific workout routines
- **Study Strategies**: Provides tailored study plans based on academic level
- **Success Tips**: Offers personalized advice for balancing student-athlete life

### Athletic Features
- Support for multiple sports (Basketball, Football, Soccer, Tennis, Swimming, Track & Field, Baseball, Volleyball)
- Training intensity levels (Recreational, Competitive, Elite)
- Practice and game schedule management
- Sport-specific workout recommendations
- Recovery and wellness planning

### Academic Features
- Class schedule integration
- Study time allocation
- Academic level support (High School, Undergraduate, Graduate)
- Study technique recommendations
- Test preparation strategies

### Smart Features
- **Personalization**: Adapts to individual preferences and goals
- **Time Management**: Optimizes daily schedules for maximum efficiency
- **Data Persistence**: Saves user data locally for future sessions
- **Export Functionality**: Download schedules as JSON files
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Clone or download the repository
2. Open `index.html` in your web browser
3. Start creating your personalized schedule!

### Usage

1. **Fill Out Your Information**
   - Enter your personal details and primary sport
   - Add your class schedule (one per line)
   - Specify your practice and game times
   - Set your academic level and study hours
   - Choose your focus areas

2. **Generate Your Schedule**
   - Click "Generate My Schedule" to create your personalized plan
   - The algorithm will analyze your commitments and create an optimized schedule

3. **View Your Results**
   - **Weekly Overview**: See your complete weekly schedule
   - **Workout Plans**: View sport-specific training routines
   - **Study Plans**: Access tailored study strategies
   - **Success Tips**: Get personalized advice for balancing academics and athletics

4. **Export and Save**
   - Export your schedule as a JSON file
   - Your data is automatically saved locally
   - Regenerate your schedule anytime with updated information

## Technical Details

### Architecture
- **Frontend**: Pure HTML5, CSS3, and JavaScript (ES6+)
- **No Backend Required**: Runs entirely in the browser
- **Local Storage**: Uses browser's localStorage for data persistence
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

### File Structure
```
stuathaibeta1/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality and AI logic
└── README.md           # Project documentation
```

### Key Components

#### StuAthScheduler Class
- Main application controller
- Handles form data collection and processing
- Manages schedule generation and display
- Implements local storage functionality

#### Scheduling Algorithm
- Parses user input for classes, practices, and games
- Allocates study time based on academic level and goals
- Generates workout schedules based on sport and training level
- Optimizes daily schedules for time conflicts and efficiency

#### Workout Plan Generator
- Sport-specific exercise routines
- Training intensity adaptation
- Progressive workout structures
- Recovery and rest day planning

#### Study Plan Generator
- Academic level-specific strategies
- Time management techniques
- Study method recommendations
- Test preparation guidance

## Customization

### Adding New Sports
To add support for new sports, update the `workoutTemplates` object in the `generateWorkoutPlans()` method:

```javascript
const workoutTemplates = {
    // ... existing sports
    'newsport': {
        recreational: {
            'Workout Name': ['Exercise 1', 'Exercise 2', 'Exercise 3']
        },
        competitive: {
            'Advanced Workout': ['Advanced Exercise 1', 'Advanced Exercise 2']
        }
    }
};
```

### Modifying Study Strategies
Update the `studyStrategies` object in the `generateStudyPlans()` method to customize study recommendations.

### Styling Customization
The CSS uses CSS custom properties and can be easily customized by modifying the color scheme and layout in `styles.css`.

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Future Enhancements

- Integration with calendar applications (Google Calendar, Outlook)
- Mobile app development
- Team collaboration features
- Advanced AI recommendations
- Integration with fitness tracking devices
- Social features for team scheduling

## Contributing

This is a demonstration project. For production use, consider:
- Adding input validation and error handling
- Implementing a proper backend for data persistence
- Adding user authentication and multi-user support
- Integrating with real calendar APIs
- Adding more sophisticated AI algorithms

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/stuathaibeta1.git
   cd stuathaibeta1
   ```
3. **Start development server**:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve .
   ```
4. **Open** `http://localhost:8000` in your browser

## Roadmap

- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Mobile app development
- [ ] Team collaboration features
- [ ] Advanced AI recommendations
- [ ] Integration with fitness tracking devices
- [ ] Social features for team scheduling
- [ ] PDF export functionality
- [ ] Multi-language support

## Bug Reports & Feature Requests

Found a bug or have a feature request? Please [open an issue](https://github.com/yourusername/stuathaibeta1/issues)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Student athletes who provided feedback and inspiration
- Open source community for tools and libraries
- Contributors who help improve the project

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/stuathaibeta1/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/stuathaibeta1/discussions)
- **Email**: john.6johnson66@gmail.com

---

**StuAth.ai** - Empowering Student Athletes to Excel Both On and Off the Field

Made with love for student athletes everywhere.
