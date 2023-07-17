import React from "react";
import { BsPerson } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const Train = () => {
  return (
    <>
      <div className="train-up">
        <div className="up-icon">
          <BsPerson />
          <MdArrowDropDown />
        </div>
      </div>
      <div className="row">
        <div className="train-left col-lg-3 col-md-4 col-sm-6">
          <div className="train-left-menu flex-shrink-0 p-3 bg-white">
            <a
              href="/"
              className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
            >
              <span className="fs-5 fw-semibold">Collapsible</span>
            </a>
            <ul className="list-unstyled ps-0">
              <li className="mb-1">
                <button
                  className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
                  data-bs-toggle="collapse"
                  data-bs-target="#home-collapse"
                  aria-expanded="true"
                >
                  <MdArrowForwardIos />
                  Home
                </button>
                <div className="collapse show" id="home-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        Overview
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        Updates
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        Reports
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="mb-1">
                <button
                  className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#dashboard-collapse"
                  aria-expanded="false"
                >
                  <MdArrowForwardIos />
                  Dashboard
                </button>
                <div className="collapse" id="dashboard-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        Overview
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        Weekly
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        Monthly
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        Annually
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="mb-1">
                <button
                  className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#orders-collapse"
                  aria-expanded="false"
                >
                  <MdArrowForwardIos />
                  Orders
                </button>
                <div className="collapse" id="orders-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        New
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        Processed
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        Shipped
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        Returned
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="border-top my-3"></li>
              <li className="mb-1">
                <button
                  className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#account-collapse"
                  aria-expanded="false"
                >
                  <MdArrowForwardIos />
                  Account
                </button>
                <div className="collapse" id="account-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        New...
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="link-dark d-inline-flex text-decoration-none rounded"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="train-right col-lg-9 col-md-8 col-sm-6">
          <h2>Create a form</h2>
          <h1>Create a form</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            adipisci possimus pariatur autem corrupti officia vitae quia sit.
            Quis molestiae voluptate, debitis quam autem deserunt quae ex nobis
            cum placeat eos odit delectus. Consequuntur, id explicabo fuga
            deleniti pariatur rerum. Eos quibusdam fugiat voluptas fuga quam
            voluptatibus delectus assumenda voluptate nobis, quod doloribus.
            <a href="/">
              Aperiam eum impedit non voluptatibus consequatur iste
              necessitatibus ad veritatis tempore cumque quia, vel quod eius
              magnam, illo, ipsa id natus. Sunt quos quae at, quam facilis ea
              cupiditate nisi.
            </a>
          </p>
          <h3>Just start typing</h3>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
          corporis, earum quae<a href="/">eius iure quo doloribus</a>voluptatum
          soluta voluptas autem odio placeat voluptatem hic quos iusto, numquam
          ut laudantium a ipsa eligendi aliquid eum
          <a href="/">pariatur error!</a>Natus veritatis officiis autem! Ut
          blanditiis earum officia commodi! Suscipit dolor non
          <a href="/">distinctio</a>minima.
          <h3>Slect, move and Dupicate Blocks</h3>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse veniam
          facilis cupiditate a, iste in porro quidem dolorem debitis. Doloribus
          qui neque explicabo veniam, molestias reiciendis est reprehenderit
          aperiam quos necessitatibus non nostrum minus nesciunt beatae eligendi
          temporibus ut excepturi natus rerum deserunt aspernatur ab sequi amet
          odio. Facilis, iure.
        </div>
      </div>
    </>
  );
};

export default Train;
