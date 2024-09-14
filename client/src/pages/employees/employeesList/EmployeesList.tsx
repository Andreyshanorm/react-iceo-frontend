import React from "react";
import { Employee } from "@prisma/client";
import styles from "./EmployeesList.module.css";
import Photo from '../../../temp/загрузка.jpeg'
import { Card } from "antd";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/authSlice";


const { Meta } = Card;

type EmployeeData = false | Employee[] | undefined;

export const EmployeesList: React.FC<{ employees: EmployeeData }> = ({
  employees,
}) => {
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  if (!employees) {
    return <div>Нет данных о пользователях</div>;
  }
  console.log(user);
  
  

  // 

  return (
    <ul className={styles.personList}>
      {employees.map((employees) => (
        <li className={styles.personListItem} key={employees.id}>
          <Card
            style={{ width: '280px', height: '510px', display: 'flex',flexDirection: 'column', position: 'relative', background: '#E9E2D0', color: 'black'}}
            cover={
              <img
                style={{ height: '280px'}}
                alt={employees.firstName}
                src={`${employees.photo}`}
              />
            }
            onClick={(e) => user ? navigate(`${paths.employee}/${employees.id}`) : navigate(`${paths.login}`)}
          >
            <div className={styles.firstName}>{employees.firstName}</div>
            <div className={styles.lastName}>{employees.lastName}</div>
            <div className={styles.age}>{employees.age} лет</div>
            <div className={styles.role}>Должность : {employees.role}</div>

            
          </Card>
          <div className={styles.icons}>
              <LikeFilled  style={{fontSize: '20px', color: 'black', position: 'absolute', right: '15px', bottom: '30px'}}/>
              <DislikeFilled style={{ color: 'black', fontSize: '20px', position: 'absolute', left: '15px', bottom: '30px'}}/>
          </div>
        </li>
      ))}
    </ul>
  );
};
