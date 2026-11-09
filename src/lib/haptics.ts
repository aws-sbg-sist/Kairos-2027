'use client';

// Web Vibration API & Mobile Haptic Feedback Engine
// Provides crisp tactile responses for mobile devices and vibration-capable browsers.

class HapticsEngine {
  private isSupported: boolean = false;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;
      const saved = localStorage.getItem('kairos_haptics_enabled');
      this.enabled = saved !== null ? saved === 'true' : true;
    }
  }

  public isAvailable(): boolean {
    return this.isSupported;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('kairos_haptics_enabled', String(this.enabled));
    }
    if (this.enabled) {
      this.medium();
    }
    return this.enabled;
  }

  private trigger(pattern: number | number[]) {
    if (!this.enabled || !this.isSupported || typeof navigator === 'undefined') return;
    try {
      if (typeof navigator.vibrate === 'function') {
        navigator.vibrate(pattern);
      }
    } catch {
      // Ignore vibration permission or browser sandbox restrictions
    }
  }

  // Micro-tick for segmented controls, tab switches, and dropdown open
  public selection() {
    this.trigger(8);
  }

  // Light tactile tap for hovers and soft interactive elements
  public light() {
    this.trigger(15);
  }

  // Standard crisp tap for button clicks
  public medium() {
    this.trigger(28);
  }

  // Heavy tactile punch for primary CTAs and modal submissions
  public heavy() {
    this.trigger(48);
  }

  // Dual-beat rhythm for successful form submission or registration
  public success() {
    this.trigger([16, 50, 32]);
  }

  // Warning buzz for invalid input or rate-limit rejections
  public error() {
    this.trigger([35, 45, 35, 45, 60]);
  }

  // Full celebratory pulse cascade paired with confetti bursts
  public celebration() {
    this.trigger([20, 40, 20, 40, 35, 60, 50]);
  }
}

export const haptics = typeof window !== 'undefined' ? new HapticsEngine() : (null as unknown as HapticsEngine);
export const useHaptics = () => haptics;
