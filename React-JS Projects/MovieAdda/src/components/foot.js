import React from "react";
import "./foot.css";

export default function Foot(){
    return(<>
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">At MovieADDA, we are passionate about providing an exceptional entertainment experience for our viewers. With a vast library of content, cutting-edge features, and a user-friendly interface, we strive to be the ultimate destination for all your streaming needs.</p>
          </div>

        </div>
        <hr/>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by 
          <a href="/"> MovieADDA</a>.
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12 soc">
            <ul class="social-icons">
              <li><a class="facebook" href="/"><i class="fa fa-facebook"></i></a></li>
              <li><a class="twitter" href="/"><i class="fa fa-twitter"></i></a></li>
              <li><a class="dribbble" href="/"><i class="fa fa-dribbble"></i></a></li>
              <li><a class="linkedin" href="/"><i class="fa fa-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
    </>);
}