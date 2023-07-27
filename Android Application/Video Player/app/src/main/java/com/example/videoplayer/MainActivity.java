package com.example.videoplayer;


import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    ListView lv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getSupportActionBar().hide();
        setContentView(R.layout.activity_main);
        lv = findViewById(R.id.lv);

        String[] data = {"Aa Chal Ke Tujhe", "Bairiya","Bandeya re Bandeya","Heer Ranjha","Kaifi Khalil","Kesariya","Mann Bharryaa","Shayad"};
        Integer[] imgid = {R.drawable.aa, R.drawable.baririya,R.drawable.bamdeya,R.drawable.heer,R.drawable.khani,R.drawable.kesariya,R.drawable.mann,R.drawable.shayad};
        CustomAdapter customAdapter = new CustomAdapter(getApplicationContext(), data, imgid);
        lv.setAdapter(customAdapter);
        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                if(i==0){
                    startActivity(new Intent(MainActivity.this,chal.class));
                } else if (i==1) {
                    startActivity(new Intent(MainActivity.this,bairiya.class));

                } else if (i==2) {
                    startActivity(new Intent(MainActivity.this,bandeya.class));

                }
                else if (i==3) {
                    startActivity(new Intent(MainActivity.this,heer.class));

                }
                else if (i==4) {
                    startActivity(new Intent(MainActivity.this,khani.class));

                }
                else if (i==5) {
                    startActivity(new Intent(MainActivity.this,kesariya.class));

                }
                else if (i==6) {
                    startActivity(new Intent(MainActivity.this,mann.class));

                }
                else if (i==7) {
                    startActivity(new Intent(MainActivity.this,shayad.class));

                }
            }
        });
    }

    public class CustomAdapter extends ArrayAdapter<String> {
        private final Context context;
        private final String[] data;
        private final Integer[] imgid;

        public CustomAdapter(@NonNull Context context, String[] data, Integer[] imgid) {
            super(context, R.layout.customlist, data);
            this.context = context;
            this.data = data;
            this.imgid = imgid;
        }

        @SuppressLint("ViewHolder")
        @NonNull
        @Override
        public View getView(int position, View convertView, @NonNull ViewGroup parent) {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            assert inflater != null;
            @SuppressLint("InflateParams") View v1 = inflater.inflate(R.layout.customlist, null);
            ImageView img = v1.findViewById(R.id.img);
            TextView name = v1.findViewById(R.id.name);
            img.setImageResource(imgid[position]);
            name.setText(data[position]);
            return v1;
        }

    }
}