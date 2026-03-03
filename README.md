# Mohamed Hany - Interactive 3D Portfolio

Welcome to the source code for my interactive portfolio. This website serves as a living exhibition of my work as a Machine Learning Specialist and Web Developer, merging data-driven backend models with immersive, high-performance 3D frontend interfaces.

## 🌟 Overview

The portfolio is built entirely using vanilla HTML/CSS/JavaScript and heavily leverages **Three.js** to create an engaging, dynamic user experience. Rather than static images, each project is represented by an interactive, live-rendered 3D visualization that users can drag, rotate, and interact with.

### Key Features

- **Immersive 3D Visualizations**: Uses `Three.js` (WebGL) to render interactive geometries representing different projects (e.g., custom extruded 3D Heart, Torus Knots, Particle Networks, and Signal Waves).
- **Responsive Glassmorphism UI**: A sleek, dark-themed design system using CSS backdrop-filters, custom glowing scrollbars, and neon `:focus-visible` accessibility styles.
- **High Performance Architecture**: Custom `IntersectionObserver` pipelines and logic throttling (`requestAnimationFrame`) ensure GPU/CPU resources are only consumed when canvases are actively visible on-screen.
- **Mobile First**: Dynamic viewport scaling, touch-event handling, and conditional rendering to ensure smooth 60fps performance even on budget devices.
- **Project Deep-Dives**: Integrated `Prism.js` for beautiful Python/JS syntax highlighting on dedicated single-page project displays.

## 🛠️ Technical Stack

- **Core**: HTML5, CSS3, JavaScript (ES6+)
- **3D Engine**: Three.js (r128)
- **Syntax Highlighting**: Prism.js (Tomorrow Night Theme)
- **Icons & Typography**: Font Awesome 6.4.0, Google Fonts (Inter)
- **Form Handling**: EmailJS (v3)

## 📁 Project Highlights

1. **Heart Disease Prediction System**: A predictive model built with Logistic Regression for cardiovascular risk assessment. Represented by an interactive, mathematically extruded 3D heart geometry.
2. **EOG Eye Tracker Interface**: An assistive technology framework for controlling computer systems via electrooculography signals. Visualized as a rotating Torus Knot.
3. **Signal Generator Framework**: A real-time UI for digital signal processing, synthesis, and analysis. Displayed as a live sine-wave buffer geometry.
4. **Stormy Pools Simulation**: A high-performance Interactive Pool Grid simulation visualized via dynamic plane geometry.

## 🧠 Data Science & Machine Learning Expertise

My core focus lies in the intersection of data science and production-ready deployments:

- Deep Learning (PyTorch, TensorFlow)
- Neural Networks & CNNs
- Ensemble Methods (XGBoost, Random Forest)
- Advanced Signal Processing & DSP
- Model Deployment & MLOps
- Data Visualization & Feature Engineering

## 🚀 Installation & Running Locally

Because this project relies entirely on client-side vanilla web technologies, no build steps, Node.js, or complex servers are required!

1. Clone this repository:

```bash
git clone https://github.com/Moharidy05/threejs-portfolio.git
```

2. Open the directory:

```bash
cd threejs-portfolio
```

3. Run a local web server (to avoid CORS issues with certain local assets and Three.js environments). If you have Python installed:

```bash
# Python 3
python -m http.server 8000
```

4. Open your browser and navigate to `http://localhost:8000`

## 📬 Contact & Links

- **LinkedIn**: [Mohamed Hany](https://www.linkedin.com/in/moharidy/)
- **X (Twitter)**: [@IamHaridy](https://x.com/IamHaridy)
- **GitHub**: [Moharidy05](https://github.com/Moharidy05)

---
