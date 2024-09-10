import React from "react";
import { Employee } from "@prisma/client";
import styles from "./EmployeesList.module.css";
import Photo from "../../../temp/загрузка.jpeg";
import { Card } from "antd";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../paths";


const { Meta } = Card;

type EmployeeData = false | Employee[] | undefined;

export const EmployeesList: React.FC<{ employees: EmployeeData }> = ({
  employees,
}) => {
  const navigate = useNavigate()
  if (!employees) {
    return <div>Нет данных о пользователях</div>;
  }

  

  return (
    <ul className={styles.personList}>
      {employees.map((employees) => (
        <li onClick={() => navigate(`${paths.employee}/${employees.id}`)} className={styles.personListItem} key={employees.id}>
          <Card
            style={{ width: '280px', height: '510px', display: 'flex', flexDirection: 'column', position: 'relative'}}
            cover={
              <img
                alt={employees.firstName}
                src={Photo}
              />
            }
          >
            <div className={styles.firstName}>{employees.firstName}</div>
            <div className={styles.lastName}>{employees.lastName}</div>
            <div className={styles.age}>{employees.age} лет</div>
            <div className={styles.role}>Должность : {employees.role}</div>

            <div className={styles.icons}>
              <LikeFilled  style={{fontSize: '20px', position: 'absolute', right: '15px', bottom: '15px'}}/>
              <DislikeFilled style={{fontSize: '20px', position: 'absolute', left: '15px', bottom: '15px'}}/>
            </div>
          </Card>
            

        </li>
      ))}
    </ul>
  );
};
