var i, j, k, IsOver, Max=3, Color=0, StartTime, EndTime;
 fld3d = new Array(Max);
 for (i=0; i < Max; i++)
 { fld3d[i]  = new Array(Max);
 }
 for (i=0; i < Max; i++)
 { for (j=0; j < Max; j++)
     fld3d[i][j] = new Array(Max);
 }
 fld2d = new Array(2);
 for (i=0; i < 2; i++)
 { fld2d[i]  = new Array(6);
 }
 for (i=0; i < 2; i++)
 { for (j=0; j < 6; j++)
     fld2d[i][j] = new Array(Max);
 }
 for (i=0; i < 6; i++)
 { for (j=0; j < Max; j++)
     fld2d[0][i][j] = new Array(Max);
 }
 for (i=0; i < 6; i++)
 { for (j=0; j < Max; j++)
     fld2d[1][i][j] = new Array(Max);
 }
 visible = new Array(6);
 for (i=0; i < 6; i++)
 { visible[i]  = new Array(Max);
 }
 for (i=0; i < 6; i++)
 { for (j=0; j < Max; j++)
     visible[i][j] = new Array(Max);
 }

 Pic = new Array(5);
 for (i=0; i < 5; i++)
 { Pic[i] = new Image(); 
  if (i == 0) {
    Pic[i].src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOijjJSIpSXiG4mXgHTMBuhiKm93jBlub2BtzzQJ394FdJZOzGjOZQ_B3AwCwl3WIQMBQqlihxcUSO5vUrcG_Y45_K-n3GYghgtTDEYwHCYO7S0Cru1B8CQtnYvKIfhEFnyKarHcu6TV56QbCkcB5YWVQFNh0li4feRUb1EwUtenX3LTAZLXD3BUeJsvDw/s25/cubula0.gif";
  }
  else if(i == 1) {
    Pic[i].src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzVzCkpw_5XpT5VuuUnwjNQWmfyfvMfdtJ9GlGuP6aHHwDCG27POzgQRRleXcSQYHSyLJs8A7eOJ-dyfOk3t9tX98rNwAM4Ln0fDIEeS35Xw6CrWjNEdvwJDl9SuVhuM-6nCeqh3QzBmsgVZQ7TUuBeGPR6Ujo21N3Z4Pqh3CKC_YFz_YbRR4dbqforxXX/s25/cubula1.gif";
  }
  else if(i == 2) {
    Pic[i].src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhSptFh8B4-sWF5_InRud84W-nJuVSx9jBz2nNYvlIGI6lQYvZru5_ZD4Sdr484vwe80nGyecXJoFcaAFGsALl9lma5Nu1cHSKXYPSnPejCXRnhGiOrQuLx8qRhDEqbiVsiU-Yr9auqJqIvi5Tr5BVoDY8sw2QRu804O7Sjw7noIiMYCgT9Dx0gqTQrr8l7/s25/cubula2.gif";
  }
  else if(i == 3) {
    Pic[i].src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiUFDxx69vhUn7qxQZX5gPoQ7cJdiRkYp1YBka0sSkDm-AdhXZz5hmAuxSXGmv30vimT0G2Mqo4Dk3MA0LEGrTDA8vu_An8oQRlz5hOMyHC-8CaIVrP4stAuDGAbMZ2Q7rum4hpWQ5C85kj3j9CHYHAd9-EiTAhvJoNCQ2XDMpf3AZ2QDNGvG7tG-fyR8p7/s25/cubula3.gif";
  }
  else if(i == 4) {
    Pic[i].src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjdpF8TUpSw5hWniMkPDmGoQ2qlFUMvQj8syB8LjLKfsEvxKwNJtR3u4wkinoT1tJCgQKbszgmZ1IpnBkMWLhi1tQRPiQmbi3CuuxDeL-OQgBtJ9Eats3bu9_ukI1qUEFh-Wla-28z5SJJtgi_G1cvck21yoa7N7JDkMXQPOGaDB7DbEoEj4tIgZ5GfD1IT/s25/cubula4.gif";
  }
   //Pic[i].src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOijjJSIpSXiG4mXgHTMBuhiKm93jBlub2BtzzQJ394FdJZOzGjOZQ_B3AwCwl3WIQMBQqlihxcUSO5vUrcG_Y45_K-n3GYghgtTDEYwHCYO7S0Cru1B8CQtnYvKIfhEFnyKarHcu6TV56QbCkcB5YWVQFNh0li4feRUb1EwUtenX3LTAZLXD3BUeJsvDw/s25/cubula"+eval(i)+".gif"; 
   
 } 

 function SetColor(cc)
 { if (cc<0) Color=1-Color;
   else Color=cc;
   window.document.images[window.document.images.length-1].src = Pic[Max*Color].src;
 }

 function Clicked(ii, jj, kk)
 { if (IsOver) return;
   if (visible[ii][jj][kk]) return;
   if (fld2d[0][ii][jj][kk]==Color)
   { visible[ii][jj][kk]=true;
     num_visible++;
     RefreshPic(ii, jj, kk);
     if (num_visible==Max*Max*6)
     { IsOver=true;
       Now = new Date();
       EndTime = Now.getTime() / 1000;
       i=Math.floor(EndTime - StartTime);
       if (window.opener)
       { if (window.opener.SetHighscores)
           window.opener.SetHighscores("cubula","",i,-1);
       }
       alert("Super, you solved this game in "+i+ " seconds !");
     }
   }
   else
   { IsOver=true;
     alert("Error ! Game over !");
   }  
 } 

 function Show()
 { if ((IsOver)&&(num_visible==Max*Max*6))
     alert("Everything's okay.");
   else
   { for (i=0; i<6; i++)
     { for (j=0; j<Max; j++)
       { for (k=0; k<Max; k++)
 	  visible[i][j][k]=true;
       }
     }
     RefreshScreen();
     alert("Show is not solve !");
     IsOver=true;
   }
 }

 function Scramble()
 { for (i=0; i<Max; i++)
   { for (j=0; j<Max; j++)
     { for (k=0; k<Max; k++)
 	fld3d[i][j][k]=Math.round(Math.random()*100)%2;
     }
   }
   for (i=0; i<Max; i++)
   { for (j=0; j<Max; j++)
     { fld2d[0][0][j][i]=fld3d[i][0][Max-1-j];
       fld2d[0][1][j][i]=fld3d[0][j][Max-1-i];
       fld2d[0][2][j][i]=fld3d[i][j][0];
       fld2d[0][3][j][i]=fld3d[Max-1][j][i];
       fld2d[0][4][j][i]=fld3d[i][Max-1][j];
       fld2d[0][5][j][i]=fld3d[i][Max-1-j][Max-1];
       fld2d[1][0][j][i]=0;
       fld2d[1][1][j][i]=0;
       fld2d[1][2][j][i]=0;
       fld2d[1][3][j][i]=0;
       fld2d[1][4][j][i]=0;
       fld2d[1][5][j][i]=0;
       for (k=0; k<Max; k++)
       { fld2d[1][0][j][i]=fld2d[1][0][j][i]+fld3d[i][k][Max-1-j];
 	fld2d[1][1][j][i]=fld2d[1][1][j][i]+fld3d[k][j][Max-1-i];
 	fld2d[1][2][j][i]=fld2d[1][2][j][i]+fld3d[i][j][k];
 	fld2d[1][3][j][i]=fld2d[1][3][j][i]+fld3d[k][j][i];
 	fld2d[1][4][j][i]=fld2d[1][4][j][i]+fld3d[i][k][j];
 	fld2d[1][5][j][i]=fld2d[1][5][j][i]+fld3d[i][Max-1-j][k];
       }
     }
   }
   for (i=0; i<6; i++)
   { for (j=0; j<Max; j++)
     { for (k=0; k<Max; k++)
 	visible[i][j][k]=false;
     }
   }
   num_visible=0;
   IsOver=false;
   RefreshScreen();  
   Now = new Date();
   StartTime = Now.getTime() / 1000;
 }

 function RefreshPic(ii, jj, kk)
 { window.document.images[ii*Max*Max+jj*Max+kk].src = Pic[Max*fld2d[0][ii][jj][kk]].src;
 }

 function RefreshScreen()
 { for (l=0; l < 2; l++)
   { for (i=0; i < 6; i++)
     { for (j=0; j<Max; j++)
       { for (k=0; k<Max; k++)
 	{ if (l==0)
           { if ((IsOver)||(visible[i][j][k]))
               window.document.images[i*Max*Max+j*Max+k].src = Pic[Max*fld2d[0][i][j][k]].src;
             else
               window.document.images[i*Max*Max+j*Max+k].src = Pic[4].src;
           }
           else
             window.document.images[6*Max*Max+i*Max*Max+j*Max+k].src = Pic[fld2d[1][i][j][k]].src;
         }
       }
     }
   }
 }

 function Help()
 { alert("The view of a cube is given which consists of 27 (3x3x3) smaller cubes."+
       " Each of them is either black or white (dark or light). The cubes are"+
       " semi-transparent: If you look at a position where all cubes are white"+
       " then it looks white, white and black cubes together look gray and a position"+
       " where all cubes are black looks black. The view (from all 6 sides) of the"+
       " large cube is displayed on the right side."+
       " Your task is to find out the colors of the smaller cubes. First choose a color"+
       " by clicking on the button \"black <--> white\" and after that click on the"+
       " fields which (you think) have the same color. If you make a mistake then the"+
       " game is over. The game is solved when the colors of all fields are found out."+
       "\nGood luck!");
 }
