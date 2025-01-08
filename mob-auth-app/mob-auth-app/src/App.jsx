import React from 'react';
import firebase from './firebase'; // Ensure firebase.js is correctly configured
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      otp: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  configureCaptcha = () => {
    // Initialize reCAPTCHA
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('reCAPTCHA solved, response:', response);
        this.onSignInSubmit();
      },
      defaultCountry: 'IN',
    });

    // Render the reCAPTCHA widget
    window.recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
      console.log('reCAPTCHA rendered with widget ID:', widgetId);
    });
  };

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha(); // Initialize the reCAPTCHA
    const phoneNumber = '+91' + this.state.mobile;
    console.log('Phone Number:', phoneNumber);
    const appVerifier = window.recaptchaVerifier;

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent, save the confirmation result for OTP verification
        window.confirmationResult = confirmationResult;
        console.log('OTP has been sent');
        alert('OTP sent to your phone.');
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        alert(error.message);
      });
  };

  onSubmitOTP = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    console.log('Entered OTP:', code);

    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User successfully verified
        const user = result.user;
        console.log('User verified:', JSON.stringify(user));
        alert('User successfully verified!');
      })
      .catch((error) => {
        console.error('Error verifying OTP:', error);
        alert('Invalid OTP. Please try again.');
      });
  };

  render() {
    return (
      <div>
        <h1 id="heading">Authentication App</h1>

        {/* reCAPTCHA container */}
        <div id="recaptcha-container" ></div><br></br>

        {/* Mobile number input */}
        <form onSubmit={this.onSignInSubmit}>
          <h3>Enter Mobile Number</h3>
          <input
            type="number"
            name="mobile"
            placeholder="Enter Mobile Number"
            required
            onChange={this.handleChange}
          />
          <button type="submit">Send OTP</button>
        </form>

        {/* OTP input */}
        <h3>Enter OTP</h3>
        <form onSubmit={this.onSubmitOTP}>
          <input
            type="number"
            name="otp"
            placeholder="Enter OTP"
            required
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
