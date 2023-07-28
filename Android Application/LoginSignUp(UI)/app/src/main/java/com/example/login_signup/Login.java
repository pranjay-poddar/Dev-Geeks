package com.example.login_signup;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.text.method.PasswordTransformationMethod;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class Login extends AppCompatActivity {
    EditText loginUsername, loginPassword;
    private Button button;
    CheckBox passwordVisibilityCheckbox;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Hide the action bar
        getSupportActionBar().hide();
        setContentView(R.layout.activity_login);

        // Initialize the login button and set a click listener
        button = (Button) findViewById(R.id.button2);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Call the method to open the homepage
                openHomepage();
            }
        });

        // Find the loginUsername and loginPassword EditText views
        loginUsername = findViewById(R.id.editTextTextPersonName);
        loginPassword = findViewById(R.id.editTextTextPassword2);

        // Find the password visibility checkbox and set a change listener
        passwordVisibilityCheckbox = findViewById(R.id.eye2);
        passwordVisibilityCheckbox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean isChecked) {
                if (isChecked) {
                    // Show password
                    loginPassword.setTransformationMethod(null);
                } else {
                    // Hide password
                    loginPassword.setTransformationMethod(new PasswordTransformationMethod());
                }
            }
        });

        // Find the "Sign Up" TextView and set a click listener to open the registration activity
        TextView signUpTextView = findViewById(R.id.sign_up);
        signUpTextView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(Login.this, register.class));
            }
        });
    }

    // Validate if the username is not empty
    public Boolean validUsername() {
        String val = loginUsername.getText().toString().trim();
        if (val.isEmpty()) {
            loginUsername.setError("Username cannot be empty");
            return false;
        } else {
            loginUsername.setError(null);
            return true;
        }
    }

    // Validate if the password is not empty and has at least 6 characters
    public Boolean validPassword() {
        String val = loginPassword.getText().toString().trim();
        if (val.isEmpty()) {
            loginPassword.setError("Password cannot be empty");
            return false;
        } else if (val.length() < 6) {
            loginPassword.setError("Password must be at least 6 characters");
            return false;
        } else {
            loginPassword.setError(null);
            return true;
        }
    }

    // Method to open the homepage activity
    public void openHomepage() {
        Intent intent = new Intent(this, Homepage.class);
        startActivity(intent);
    }

}
