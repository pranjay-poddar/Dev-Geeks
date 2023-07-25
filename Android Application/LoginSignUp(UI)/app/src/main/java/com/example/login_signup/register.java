package com.example.login_signup;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.text.method.HideReturnsTransformationMethod;
import android.text.method.PasswordTransformationMethod;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

public class register extends AppCompatActivity {

    // Variable to track password visibility state
    private boolean isPasswordVisible = false;
    private Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        // Initialize the 'button' variable with the button from the layout
        button = (Button) findViewById(R.id.button2);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Call the 'openhome()' method when the button is clicked
                openhome();
            }
        });

        // Hide the action bar (title bar) of the activity
        getSupportActionBar().hide();

        // Find the various EditText and TextView views in the layout
        EditText nameEditText = findViewById(R.id.editTextTextPersonName5);
        EditText emailEditText = findViewById(R.id.editTextTextEmailAddress);
        EditText contactEditText = findViewById(R.id.editTextPhone);
        EditText adhaarEditText = findViewById(R.id.aadhar);
        EditText instituteEditText = findViewById(R.id.editTextTextPersonName10);
        EditText passwordEditText = findViewById(R.id.password);

        // Find the 'login' TextView and set a click listener to it
        TextView loginTextView = findViewById(R.id.login);
        loginTextView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Start the 'Login' activity when the 'login' TextView is clicked
                startActivity(new Intent(register.this, Login.class));
            }
        });

        // Find the 'passwordVisibilityCheckbox' CheckBox and set a listener to it
        @SuppressLint({"MissingInflatedId", "LocalSuppress"}) CheckBox passwordVisibilityCheckbox = findViewById(R.id.eye);
        passwordVisibilityCheckbox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean isChecked) {
                // Update the 'isPasswordVisible' variable based on the checkbox state
                isPasswordVisible = isChecked;
                // Show or hide the password based on the checkbox state
                if (isChecked) {
                    passwordEditText.setTransformationMethod(HideReturnsTransformationMethod.getInstance());
                } else {
                    passwordEditText.setTransformationMethod(PasswordTransformationMethod.getInstance());
                }
                // Move the cursor to the end of the password text
                passwordEditText.setSelection(passwordEditText.getText().length());
            }
        });
    }

    // Method to clear the input fields
    private void clearFields() {
        EditText nameEditText = findViewById(R.id.editTextTextPersonName5);
        EditText emailEditText = findViewById(R.id.editTextTextEmailAddress);
        EditText contactEditText = findViewById(R.id.editTextPhone);
        EditText adhaarEditText = findViewById(R.id.aadhar);
        EditText instituteEditText = findViewById(R.id.editTextTextPersonName10);
        EditText passwordEditText = findViewById(R.id.password);

        // Clear the contents of all EditText fields
        nameEditText.setText("");
        emailEditText.setText("");
        contactEditText.setText("");
        adhaarEditText.setText("");
        instituteEditText.setText("");
        passwordEditText.setText("");
    }

    // Method to check if a contact number is valid (10 digits)
    private boolean isContactValid(String contact) {
        // Pattern to match a valid contact number (10 digits)
        String contactPattern = "[0-9]{10}";
        return contact.matches(contactPattern);
    }

    // Method to open the 'Login' activity
    public void openlogin() {
        Intent intent = new Intent(this, Login.class);
        startActivity(intent);
    }

    // Method to open the 'Homepage' activity
    public void openhome() {
        Intent intent = new Intent(this, Homepage.class);
        startActivity(intent);
    }
}
