import React, { useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useEditOneMutation,
  useGetOneQuery,
  useRemoveOneMutation,
} from "../../app/services/employees";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { CircularProgress } from "@mui/material";
import { Breadcrumb, Button, Divider, Modal, Row, Space } from "antd";
import Photo from "../../temp/загрузка.jpeg";
import styles from "./Employee.module.css";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

export const EmployeePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { data, isLoading } = useGetOneQuery(params.id || "");
  const [removeEmployee] = useRemoveOneMutation();
  const [editEmployee] = useEditOneMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return (
      <Layout>
        <Row align="middle" justify="center">
          <CircularProgress color="inherit" size={100} />
        </Row>
      </Layout>
    );
  }

  if (!data) {
    return <Navigate to="/" />;
  }

  const handleDeleteUser = async () => {
    setDeleteModalOpen(false);

    try {
      await removeEmployee({ id: data.id }).unwrap();
      navigate(`${paths.status}/deleted`);
    } catch (error) {
      const hasError = isErrorWithMessage(error);
      if (hasError) {
        setError(error.data.message);
      } else setError("Неизвестная ошибка");
    }
  };

  return (
    <>
      <Layout>
        <Breadcrumb style={{fontSize: '16px', height: '24px'}}
          items={[
            {
              title: "Employee",
              path: `${paths.home}`
            },
            {
              title: `${data.firstName} ${data.lastName}`,
            },
          ]}
          params={{ id: 1 }}
        />
        <h1 style={{ textAlign: "center" }}>Карточка Сотрудника</h1>
        <div className={styles.employeeCard}>
          <div className={styles.gradient}></div>
          <div className={styles.card}>
            <img style={{width: '200px', height: '150px'}} src={`${data.photo}`} alt={data.firstName}/>
            <h2>{data.firstName}</h2>
            <h2>{data.lastName}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestias nulla, ab asperiores ipsa voluptate temporibus. A est
              recusandae non quae!
            </p>
            <span className={styles.left}>{data.role}</span>
            <span className={styles.right}>{`Возраст : ${data.age} года`}</span>
            <span className={styles.likes}>Likes : 1</span>
            <span className={styles.dislikes}>Dislikes : 1</span>
          </div>
        </div>
        {user?.id === data.userId && (
          <>
            <Divider
              style={{
                marginTop: "200px",
                color: "white",
                borderColor: "white",
              }}
              orientation="center"
            >
              Действия
            </Divider>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-around",
                gap: "15px",
              }}
            >
              <Link to={`${paths.employeeEdit}/${data.id}`}>
                <Button size="middle" icon={<EditFilled />} type="primary">
                  Редактировать
                </Button>
              </Link>

              <Button
                onClick={() => setDeleteModalOpen(true)}
                danger
                icon={<DeleteFilled />}
                type="primary"
              >
                Удалить сотрудника
              </Button>
            </Space>
          </>
        )}
        <ErrorMessage message={error} />
        <Modal
          cancelText="Отменить"
          okText="Подтвердить"
          onOk={handleDeleteUser}
          onCancel={() => setDeleteModalOpen(false)}
          open={isDeleteModalOpen}
          title="Подтвердите удаление"
        >
          Вы точно хотите удалить этого сотрудника?
        </Modal>
        <Modal
          cancelText="Отменить"
          onCancel={() => setEditModalOpen(false)}
          open={isEditModalOpen}
        ></Modal>
      </Layout>
    </>
  );
};
