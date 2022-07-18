@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600&display=swap');

*{
  font-family: 'Nunito', sans-serif;
  margin:0; padding:0;
  box-sizing: border-box;
  text-decoration: none;
  outline: none; border:none;
  text-transform: capitalize;
  transition: all .2s linear;
}

$red:#f00;
$black : #000;
$white : #fff;
$light-white:#aaa;
$light-bg:#111;

@mixin grid($val) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax($val, 1fr));
  gap:1.5rem;
}

html{
  font-size: 62.5%;
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
  overflow-x: hidden;

  &::-webkit-scrollbar{
    width: 1rem;
  }

  &::-webkit-scrollbar-track{
    background: $black;
  }

  &::-webkit-scrollbar-thumb{
    background: $red;
  }
}

body{
  background: $black;
}

section{
  padding:5rem 9%;
}

.heading{
  text-align: center;
  margin-bottom: 3rem;
  position: relative;

  &::before{
    content: '';
    position: absolute;
    top:50%; left:0;
    transform: translateY(-50%);
    height: .1rem;
    width: 100%;
    background: $light-white;
    z-index: -1;
  }

  span{
    font-size: 3rem;
    color:$red;
    background: $black;
    padding:.5rem 1.5rem;
    border:.1rem solid $light-white;
    border-radius: .5rem;
  }
}

.btn{
  margin-top: 1rem;
  display: inline-block;
  padding:1rem 2.8rem;
  padding-right: 3rem;
  background:linear-gradient(130deg, $red 93%, transparent 90%);
  color:$white;
  cursor: pointer;
  font-size: 1.7rem;

  &:hover{
    transform:scale(1.1);
  }
}

.header{
  position: fixed;
  top:0; left:0; right:0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:0 9%;
  z-index: 10000;
  background: $black;

  .logo{
    font-weight: bolder;
    color:$white;
    font-size: 3rem;

    span{
      color:$red;
    }
  }

  .navbar a{
    display: inline-block;
    padding:1.5rem 2rem;
    font-size: 1.7rem;
    color:$white;

    &:hover{
      background: $red;
    }
  }
}

#menu-btn{
  font-size: 3rem;
  color:$white;
  cursor: pointer;
  display: none;
}

.home{
  padding:0;
  margin-top: 5rem;

  .slide{
    min-height:70vh;
    background-size: cover !important;
    background-position: center !important;
    padding:2rem 9%;
    display: flex;
    align-items: center;

    .content{
      width:60rem;

      span{
        font-size: 2rem;
        color:$red;
        display: block;
      }

      h3{
        font-size: 5rem;
        color:$white;
        padding:1rem 0;
      }
    }
  }
}

.swiper-pagination-bullet{
  height: 2rem;
  width: 2rem;
  background: $white;
  border-radius: 0;

  &.swiper-pagination-bullet-active{
    background: $red;
  }
} 

.about{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap:8rem;

  .image{
    flex:1 1 42rem;
    position: relative;

    &::before,
    &::after{
      content: '';
      position: absolute;
      z-index: -1;
      background: $red;
      height: 15rem;
      width: 15rem;
    }

    &::before{
      top:0; left:0;
    }

    &::after{
      bottom:0; right:0;
    }

    img{
      width: 100%;
      padding:2rem;
    }
  }

  .content{
    flex: 1 1 42rem;

    span{
      font-size: 2rem;
      color:$red;
    }

    .title{
      font-size: 4rem;
      color:$white;
      margin-top: .5rem;
    }

    p{
      font-size: 1.5rem;
      color:$light-white;
      padding: 1rem 0;
      line-height: 2;
    }

    .box-container{
      display: flex;
      flex-wrap: wrap;
      gap:2rem;
      margin-top: 1rem;

      .box{
        flex:1 1 20rem;

        h3{
          font-size: 2rem;
          color:$white;

          i{
            padding-right: 1.5rem;
            color:$red;
          }
        }
      }
    }
  }
}

.features .box-container{
  @include grid(32rem);
  gap:0;

  .box{
    background: $light-bg;

    &.second{
      display: flex;
      flex-flow: column-reverse;
    }

    &:hover .image img{
      transform: scale(1.1);
    }

    .image{
      height: 30rem;
      width: 100%;
      overflow:hidden;

      img{
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    .content{
      padding:2rem;
      text-align: center;

      img{
        height: 9rem;
        margin-bottom: 1rem;
        filter: invert(1);
      }

      h3{
        font-size: 2rem;
        color:$red;
      }

      p{
        line-height: 2;
        font-size: 1.5rem;
        color:$light-white;
        padding:1rem 0;
      }
    }
  }
}

.pricing{
  @include grid(32rem);

  .information{

    span{
      font-size: 2rem;
      color:$red;
    }

    h3{
      font-size: 4rem;
      padding-top: .5rem;
      color:$white;
    }

    p{
      line-height: 2;
      padding:1rem 0;
      font-size: 1.4rem;
      color:$light-white;

      i{
        padding-right: 1rem;
        color: $red;
      }
    }
  }

  .plan{
    text-align: center;
    padding:2rem;

    &.basic{
      background:linear-gradient(130deg,  $light-bg 93%, transparent 90%);
    }

    h3{
      font-size: 2.5rem;
      margin:1rem 0;
      color:$white;
    }

    .price{
      font-size: 5rem;
      font-weight: bolder;
      color:$red;

      span{
        color:$white;
        font-size: 2rem;
      }
    }

    .list{
      padding:1rem 0;

      p{
        line-height: 2;
        padding:1rem 0;
        font-size: 1.4rem;
        color:$light-white;
  
        i{
          padding-right: 1rem;
          color: $red;
        }
      }
    }
  }
}

.trainers .box-container{
  @include grid(29rem);

  .box{
    height: 40rem;
    overflow: hidden;
    position: relative;

    &:hover .content{
      transform: translateY(0);
    }

    img{
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    .content{
      position: absolute;
      bottom: 0; left:0; right:0;
      background: $light-bg;
      padding:2rem;
      transform: translateY(6.5rem);

      span{
        font-size: 1.5rem;
        color:$red;
      }

      h3{
        font-size: 2rem;
        color:$white;
        padding-top: .5rem;
      }

      .share{
        padding-top: 2rem;
        margin-top: 1.5rem;
        border-top: .1rem solid $light-white;

        a{
          font-size: 2rem;
          color:$white;
          margin-right: 1.5rem;

          &:hover{
            color:$red;
          }
        }
      }
    }
  }
}

.banner{
  background:linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url(../images/banner-bg.jpg) no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  text-align: center;

  span{
    font-size: 2rem;
    color:$red;
  }

  h3{
    padding-top: 1rem;
    color:$white;
    text-transform: uppercase;
    font-size: 3.5rem;
  }

  p{
    margin:1rem auto;
    max-width: 60rem;
    font-size: 1.5rem;
    color:$light-white;
    line-height: 2;
  }
}

.review{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap:2rem;

  .information{
    flex:1 1 35rem;

    span{
      font-size: 2rem;
      color:$red;
    }

    h3{
      font-size: 3rem;
      color:$white;
      padding-top: 1rem;
    }

    p{
      font-size: 1.5rem;
      line-height: 2;
      color:$light-white;
      padding:1rem 0;
    }
  }
  
  .review-slider{
    flex:1 1 60rem;

    .slide{
      background:linear-gradient(130deg,  $light-bg 93%, transparent 90%);
      padding:2rem 3rem;

      p{
        font-size: 1.5rem;
        line-height: 2;
        color:$light-white;
      }

      .user{
        display: flex;
        align-items: center;
        margin-top: 1.5rem;

        img{
          height: 5rem;
          width: 5rem;
          object-fit: cover;
          border-radius: 50%;
          margin-right: 1rem;
        }

        h3{
          font-size: 2rem;
          color:$white;
        }

        span{
          color:$red;
          font-size: 1.5rem;
        }

        i{
          font-size: 5rem;
          margin-left: auto;
          margin-right: 2rem;
          color:$red;
        }
      }
    }
  }
}

.blogs{

  .slide{
    background: $light-bg;
    margin-bottom: 7rem;

    &:hover .image img{
      transform: scale(1.1);
    }

    .image{
      height: 25rem;
      width: 100%;
      overflow: hidden;

      img{
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    .content{
      padding:2rem;

      .link{
        padding-bottom: 1.5rem;
        font-size: 1.5rem;

        a{
          color:$red;

          &:hover{
            color:$white;
          }
        }

        span{
          color:$white;
          padding:0 1rem;
        }
      }

      h3{
        font-size: 2rem;
        color:$white;
        line-height: 1.5;
      }

      p{
        font-size: 1.5rem;
        color:$light-white;
        line-height: 2;
        padding:1rem 0;
      }
    }
  }
}

.footer{

  .box-container{
    @include grid(25rem);

    .box{

      h3{
        font-size: 2.2rem;
        color:$white;
        padding:1rem 0;
      }

      .links{
        font-size: 1.5rem;
        display: block;
        color:$light-white;
        padding:1rem 0;

        &:hover{
          color:$red;
        }
      }

      p{
        font-size: 1.5rem;
        color:$light-white;
        padding:1rem 0;

        i{
          padding-right: .5rem;
          color:$red;
        }
      }

      .share{
        padding:1rem 0;

        a{
          height: 4.5rem;
          width: 4.5rem;
          line-height: 4.5rem;
          font-size: 1.7rem;
          color:$white;
          background: $light-bg;
          border-radius: 50%;
          margin-right: .5rem;
          text-align:center;

          &:hover{
            background: $red;
          }
        }
      }

      form{

        .email{
          margin-bottom: 1rem;
          width: 100%;
          background: $light-bg;
          padding:1.2rem;
          font-size: 1.5rem;
          color:$white;
          text-transform: none;
        }
      }
    }
  }
}

.credit{
  font-size: 2rem;
  text-align:center;
  padding:2rem;
  color:$white;
  background: $light-bg;
  line-height: 1.5;

  span{
    color:$red;
  }
}












// media queries 

@media (max-width:991px){

  html{
    font-size: 55%;
    scroll-padding: 7rem;
  }

  .header{
    padding:0 2rem;
  }

  section{
    padding:3rem 2rem;
  }

  .home .slide{
    padding:2rem 5%;

    .content{
      width: 50rem;

      h3{
        font-size: 4rem;
      }
    }
  }

}

@media (max-width:768px){

  #menu-btn{
    display: inline-block;

    &.fa-times{
      transform: rotate(180deg);
    }
  }  

  .header{
    padding:2rem;

    .navbar{
      position: absolute;
      top:99%; left:0; right:0;
      background: $black;
      clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);

      &.active{
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }

      a{
        display: block;
        font-size: 2rem;
      }
    }
  }

  .about{
    gap:3rem;

    .image{
      margin-top: 5rem;
    }

    .content .title{
      font-size: 3rem;
    }
  }

  .features .box-container .box.second{
    flex-flow: column;
  }

}

@media (max-width:450px){

  html{
    font-size: 50%;
  }

}