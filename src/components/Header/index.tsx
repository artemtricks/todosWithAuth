import { Button } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import svgPlus from "../../assets/plus.svg";
import { useSelector, useDispatch } from "react-redux";
import { loguot, selectorIsAuth } from "../../redux/authSlice";

const MainHeader = () => {
  const isAuth = useSelector(selectorIsAuth);
  const isAuthToken = Boolean(!isAuth && !window.localStorage.getItem("token"));
  //@ts-ignore
  const { data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(loguot());
    window.localStorage.removeItem("token");
  };
  return (
    <Header style={{ backgroundColor: "#b5b5b5", borderRadius: 10 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to={"/form"} style={{ marginRight: 10 }}>
          <Button style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: 5 }}>Добавить</div>
            <img src={svgPlus} alt="" style={{ width: 15, height: 15 }} />
          </Button>
        </Link>
        <Link to={"/"}>
          <Button style={{ marginRight: 10 }}>Все задачи</Button>
        </Link>
        {isAuthToken ? (
          <Link to={"/auth"}>
            <Button> Авторизация</Button>
          </Link>
        ) : (
          <Button onClick={onClickLogout}>Выйти</Button>
        )}

        <h1
          style={{
            margin: "auto",
            color: "white",
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          {isAuthToken ? "Задачи" : `Hello ${data?.fullName}!`}
        </h1>
      </div>
    </Header>
  );
};

export default MainHeader;
