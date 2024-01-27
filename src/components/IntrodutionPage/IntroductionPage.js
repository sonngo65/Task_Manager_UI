import { Button } from "bootstrap";
import Header from "../layout/Header";
import "./_introduction.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Container } from "react-bootstrap";
function IntroductionPage() {
  const [isActived, setIsActived] = useState(false);
  return (
    <div className="introduction-page">
      <Header />
      <div className="intro">
        <Container>
          <div className="intro__content">
            <h2 className="intro__title">
              Đăng nhập để sử dụng
              <br /> các chức năng
            </h2>
            <p className="intro__desc">Nếu chưa có tài khoản hãy đăng ký</p>
            <button>
              <Link to="/login">Đăng ký</Link>
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
}
export default IntroductionPage;
