package com.example.login_signup;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    private Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Hide the action bar (title bar) of the activity
        getSupportActionBar().hide();

        // Set the layout for the activity from the activity_main.xml file
        setContentView(R.layout.activity_main);

        // Find the 'button4' Button from the layout and set a click listener to it
        button = (Button) findViewById(R.id.button4);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Call the 'openregister()' method when 'button4' is clicked
                openregister();
            }
        });

        // Find the 'button3' Button from the layout and set a click listener to it
        button = (Button) findViewById(R.id.button3);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Call the 'openLogin()' method when 'button3' is clicked
                openLogin();
            }
        });
    }

    // Method to open the 'register' activity
    public void openregister() {
        Intent intent = new Intent(this, register.class);
        startActivity(intent);
    }

    // Method to open the 'Login' activity
    public void openLogin() {
        Intent intent = new Intent(this, Login.class);
        startActivity(intent);
    }
}
