# Mohamed Hany - Portfolio & Signal Processing Framework

This repository contains the source code for my personal portfolio website, featuring interactive 3D visualizations, as well as the full source code for my custom **Signal Processing Framework** desktop application.

## 🌐 Portfolio Website

A responsive, interactive portfolio built with **HTML5**, **CSS3**, and **JavaScript**, utilizing **Three.js** for 3D graphics and **EmailJS** for contact functionality.

### Key Features
* **3D Neural Network Background:** An interactive particle system that reacts to mouse movement.
* **3D Project Previews:** unique 3D models for each project card (Pulsing Heart, Torus Knot, Water Plane, and Sine Wave).
* **Glassmorphism UI:** Modern, translucent design with gradient borders and glowing effects.
* **Contact Form:** Integrated with EmailJS for real-time messaging.

### Tech Stack
* **Frontend:** HTML5, CSS3 (CSS Grid/Flexbox), JavaScript (ES6+).
* **Libraries:** [Three.js (r128)](https://threejs.org/), [EmailJS](https://www.emailjs.com/), FontAwesome.

---

## 📡 Signal Processing Framework (Python)

Included in this repository is a comprehensive Desktop GUI application for Digital Signal Processing (DSP). It implements core DSP algorithms **from scratch** (without relying on library shortcuts for the math) to demonstrate algorithmic understanding.

**File:** `main.py`
**Dependencies:** `requirements.txt`

### Features
1.  **Frequency Domain:**
    * **FFT & DFT:** Implements recursive Cooley-Tukey FFT and O(N²) DFT algorithms manually.
    * **Spectrum Analysis:** View Amplitude and Phase spectra, modify individual frequency components, and reconstruct signals (IDFT/IFFT).
2.  **Time Domain:**
    * **Smoothing & Sharpening:** Moving average filters and derivative-based sharpening.
    * **Convolution & Correlation:** Cross-correlation (normalized), Auto-correlation, and Signal Convolution.
    * **Manipulation:** Delay/Advance, Folding, and DC component removal.
3.  **Digital Filtering (FIR):**
    * Design Low Pass, High Pass, Band Pass, and Band Stop filters.
    * Windowing techniques: Rectangular, Hanning, Hamming, Blackman.
4.  **Quantization:**
    * Convert signals to digital levels/bits and analyze quantization error.

### How to Run the DSP App

1.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
    *(Requires `numpy`, `matplotlib`, and `tkinter`)*

2.  **Run the Application:**
    ```bash
    python main.py
    ```

---

## 📂 Project Structure

```text
├── index.html             # Main Portfolio Landing Page
├── style.css              # Global Styles & Glassmorphism Effects
├── script.js              # Three.js Visualizations & Logic
├── main.py                # Signal Processing Framework (Entry Point)
├── requirements.txt       # Python Dependencies
├── project-heart.html     # Project Page: Heart Disease Prediction
├── project-eog.html       # Project Page: EOG Eye Tracker
├── project-stormy.html    # Project Page: Stormy Pools
└── project-signal.html    # Project Page: DSP Framework Documentation
