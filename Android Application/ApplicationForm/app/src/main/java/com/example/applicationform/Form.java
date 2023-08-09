package com.example.applicationform;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Patterns;
import android.view.View;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import java.util.Calendar;
import java.util.HashMap;

public class Form extends AppCompatActivity {
    private EditText nameEditText;
    private EditText dobEditText;
    private EditText genderEditText;
    private EditText contactEditText;
    private EditText emailEditText;
    private EditText aadhaarEditText;
    private EditText FatherEditText;
    private EditText EducationEditText;
    private EditText EnrolmentEditText;
    private EditText YearEditText;
    private EditText IncomeEditText;
    private EditText ExpensesEditText;
    private EditText fatherEditText;
    private EditText motherEditText;
    private EditText ScholarEditText;
    private EditText FinancialEditText;
    EditText etDate;
    DatePickerDialog.OnDateSetListener setListener;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_form);
        getSupportActionBar().hide();
        nameEditText = findViewById(R.id.editTextTextPersonName5);
        dobEditText = findViewById(R.id.date);
        genderEditText = findViewById(R.id.editTextTextPersonName2);
        contactEditText = findViewById(R.id.editTextPhone2);
        emailEditText = findViewById(R.id.editTextTextEmailAddress2);
        aadhaarEditText = findViewById(R.id.editTextNumber);
        FatherEditText = findViewById(R.id.editTextTextPersonName4);
        EducationEditText = findViewById(R.id.editTextTextPersonName6);
        EnrolmentEditText = findViewById(R.id.editTextNumber2);
        YearEditText = findViewById(R.id.editTextTextPersonName7);
        IncomeEditText = findViewById(R.id.editTextTextPersonName8);
        ExpensesEditText = findViewById(R.id.editTextTextPersonName9);
        fatherEditText = findViewById(R.id.editTextTextPersonName11);
        motherEditText = findViewById(R.id.editTextTextPersonName12);
        ScholarEditText = findViewById(R.id.editTextTextMultiLine);
        FinancialEditText = findViewById(R.id.editTextTextMultiLine2);

        findViewById(R.id.Applications).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String name = nameEditText.getText().toString();
                String dob = dobEditText.getText().toString();
                String gender = genderEditText.getText().toString();
                String contact = contactEditText.getText().toString();
                String email = emailEditText.getText().toString();
                String aadhaar = aadhaarEditText.getText().toString();
                String father = FatherEditText.getText().toString();
                String education = EducationEditText.getText().toString();
                String Roll = EnrolmentEditText.getText().toString();
                String year = YearEditText.getText().toString();
                String income = IncomeEditText.getText().toString();
                String expenses = ExpensesEditText.getText().toString();
                String father_occ = fatherEditText.getText().toString();
                String mother_occ = motherEditText.getText().toString();
                String scholor = ScholarEditText.getText().toString();
                String assistance = FinancialEditText.getText().toString();

                if (name.isEmpty()) {
                    Toast.makeText(Form.this, "Please enter your name", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (dob.isEmpty()) {
                    Toast.makeText(Form.this, "Please enter your Date of Birth", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (gender.isEmpty()) {
                    Toast.makeText(Form.this, "Please enter your Gender", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (aadhaar.isEmpty()) {
                    Toast.makeText(Form.this, "Please enter your Aadhaar number", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (aadhaar.length() != 12) {
                    Toast.makeText(Form.this, "Enter valid Aadhaar Number", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (father.isEmpty()) {
                    Toast.makeText(Form.this, "Please enter your Father's Name", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (education.isEmpty()) {
                    Toast.makeText(Form.this, "Please enter your Educational institution", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (Roll.isEmpty()) {
                    Toast.makeText(Form.this, "Please enter your Enrollment Number", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (income.isEmpty()) {
                    Toast.makeText(Form.this, "Please enter your Family Income", Toast.LENGTH_SHORT).show();
                    return;
                }

                // TODO: Perform further actions or processing with the form data here
            }
        });
    }
}
