package com.example.login_signup;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import android.content.DialogInterface;
import android.os.Bundle;

public class Homepage extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Hide the action bar (title bar) of the activity
        getSupportActionBar().hide();

        // Set the layout for the activity from the activity_homepage.xml file
        setContentView(R.layout.activity_homepage);
    }

    // Override the default behavior of the "Back" button press
    @Override
    public void onBackPressed() {
        // Create an AlertDialog to prompt the user when the back button is pressed
        AlertDialog.Builder alertDialog = new AlertDialog.Builder(Homepage.this);

        // Set the title and message for the dialog
        alertDialog.setTitle("Exit App");
        alertDialog.setMessage("Do you want to exit?");

        // Define the behavior for the "No" button
        alertDialog.setPositiveButton("No", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                // Dismiss the dialog (do nothing) if "No" is clicked
                dialog.dismiss();
            }
        });

        // Define the behavior for the "Yes" button
        alertDialog.setNegativeButton("Yes", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                // Finish the current activity and all activities immediately below it in the stack
                finishAffinity();
            }
        });

        // Show the AlertDialog
        alertDialog.show();
    }
}
