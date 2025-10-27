# Contributing to StuAth.ai

Thank you for your interest in contributing to StuAth.ai! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript
- Git installed on your system

### Setting Up the Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/stuathaibeta1.git
   cd stuathaibeta1
   ```

3. **Start the local development server**:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve .
   ```

4. **Open your browser** and navigate to `http://localhost:8000`

## Development Guidelines

### Code Style
- Use consistent indentation (2 spaces for HTML/CSS, 4 spaces for JavaScript)
- Follow existing naming conventions
- Comment complex logic and functions
- Keep functions focused and modular

### File Structure
```
stuathaibeta1/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality and AI logic
├── demo.html           # Demo page
├── README.md           # Project documentation
├── LICENSE             # MIT License
├── CONTRIBUTING.md     # This file
└── .gitignore          # Git ignore rules
```

## Areas for Contribution

### High Priority
- **Bug Fixes**: Report and fix any issues you encounter
- **Performance Optimization**: Improve loading times and responsiveness
- **Accessibility**: Enhance screen reader support and keyboard navigation
- **Mobile Experience**: Improve mobile interface and touch interactions

### Feature Enhancements
- **New Sports**: Add support for additional sports
- **Calendar Integration**: Connect with Google Calendar, Outlook, etc.
- **Export Formats**: Add PDF, CSV, or iCal export options
- **Advanced Scheduling**: More sophisticated AI algorithms
- **Team Features**: Multi-user support for teams

### UI/UX Improvements
- **Additional Themes**: More color schemes and themes
- **Customization**: User-customizable interface elements
- **Animations**: Smooth transitions and micro-interactions
- **Responsive Design**: Better tablet and mobile layouts

## Reporting Issues

### Before Submitting
1. Check if the issue already exists
2. Try to reproduce the issue
3. Test on different browsers and devices

### Issue Template
When reporting issues, please include:
- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Browser/OS**: Browser version and operating system
- **Screenshots**: If applicable, include screenshots

## Submitting Changes

### Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Write clean, well-commented code
   - Test your changes thoroughly
   - Update documentation if needed

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**:
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots if applicable

### Commit Message Guidelines
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally

Examples:
- `Add: Dark mode toggle functionality`
- `Fix: Mobile responsive layout issues`
- `Update: README with new installation instructions`

## Testing

### Manual Testing
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on different devices (desktop, tablet, mobile)
- Test both light and dark modes
- Test form validation and error handling
- Test schedule generation with various inputs

### Test Cases
1. **Form Validation**: Ensure all required fields are validated
2. **Schedule Generation**: Test with different sport combinations
3. **Dark Mode**: Verify toggle functionality and persistence
4. **Responsive Design**: Test on various screen sizes
5. **Data Persistence**: Verify localStorage functionality

## Documentation

### Code Documentation
- Comment complex algorithms and functions
- Use JSDoc for JavaScript functions
- Include inline comments for complex logic

### User Documentation
- Update README.md for new features
- Add usage examples and screenshots
- Document any new configuration options

## Design Guidelines

### Color Scheme
- **Light Mode**: Professional blues and grays
- **Dark Mode**: Navy blues with proper contrast
- **Accent Colors**: Use consistent accent colors for highlights

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Fallback**: System fonts (Arial, sans-serif)
- **Hierarchy**: Clear heading structure (h1-h6)

### Responsive Design
- **Mobile First**: Design for mobile, enhance for desktop
- **Breakpoints**: 480px, 768px, 1024px
- **Touch Targets**: Minimum 44px for touch interactions

## Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different opinions and approaches

### Communication
- Use clear, concise language
- Provide context for your suggestions
- Ask questions if something is unclear
- Be patient with response times

## 📋 Review Process

### What We Look For
- **Functionality**: Does the code work as intended?
- **Code Quality**: Is the code clean and maintainable?
- **Testing**: Has the contributor tested their changes?
- **Documentation**: Are changes properly documented?
- **Performance**: Does the change impact performance?

### Review Timeline
- Initial review within 48 hours
- Follow-up reviews as needed
- Merge when approved by maintainers

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributor statistics

## Getting Help

If you need help or have questions:
- Open an issue for questions
- Use GitHub Discussions for general discussion
- Check existing issues and pull requests

Thank you for contributing to StuAth.ai! Together, we can help student athletes excel both on and off the field!
