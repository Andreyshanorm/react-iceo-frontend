import React from "react";
import styles from "./header.module.css";
import { Layout, Space, Typography } from "antd";
import { LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { CustomButton } from "../CostomButton/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectUser } from "../../features/auth/authSlice";

export const Header = () => {
  const isAuth = useSelector(selectUser);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogOutCLick = () => {
    dispatch(logOut())
    localStorage.removeItem('tokem')
    navigate(paths.login)
  }

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={isAuth ? paths.home : paths.login}>
          <CustomButton type="ghost">
            <Typography.Title style={{ paddingTop: "8px" }} level={2}>
              Сотрудники
            </Typography.Title>
          </CustomButton>
        </Link>
      </Space>

      <div style={{ display: "flex", gap: "15px" }}>
        {!isAuth ? (
          <>
            <Link className={styles.headerLink} to={paths.registration}>
              <CustomButton
                type="ghost"
                icon={<UserOutlined style={{ fontSize: "30px" }} />}
              >
                <span
                  style={{
                    fontSize: "18px",
                    paddingTop: "8px",
                    color: "rgba(255, 255, 255, 0.85)",
                  }}
                >
                  Зарегестрироваться
                </span>
              </CustomButton>
            </Link>
            <Link to={paths.login}>
              <CustomButton
                type="ghost"
                icon={<LoginOutlined style={{ fontSize: "30px" }} />}
              >
                <span
                  style={{
                    fontSize: "18px",
                    paddingTop: "8px",
                    color: "rgba(255, 255, 255, 0.85)",
                  }}
                >
                  Войти
                </span>
              </CustomButton>
            </Link>
          </>
        ) : (
              <CustomButton
                type="ghost"
                icon={<LogoutOutlined style={{ fontSize: "30px" }} />}
                onClick={handleLogOutCLick}
              >
              </CustomButton>
        )}
      </div>
    </Layout.Header>
  );
};
