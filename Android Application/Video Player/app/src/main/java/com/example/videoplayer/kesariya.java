package com.example.videoplayer;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.MediaController;
import android.widget.VideoView;

public class kesariya extends AppCompatActivity {
    VideoView vv;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getSupportActionBar().hide();
        setContentView(R.layout.activity_kesariya);
        vv=findViewById(R.id.kesariya);
        vv.setVideoPath("android.resource://" + getPackageName() + "/" + R.raw.kesariya);

        MediaController med=new MediaController(this);
        vv.setMediaController(med);
        med.setAnchorView(vv);
        vv.start();
    }
}