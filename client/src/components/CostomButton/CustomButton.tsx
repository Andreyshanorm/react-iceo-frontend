import React from "react";
import { Button, Form } from "antd";
import styles from './CustomButton.module.css'


type Props = {
  children?: React.ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  type:
    | "link"
    | "text"
    | "ghost"
    | "default"
    | "primary"
    | "dashed"
    | undefined;
  danger?: boolean;
  isLoading?: boolean;
  shape?: "default" | "circle" | "round";
  icon?: React.ReactNode;
};

export const CustomButton: React.FC<Props> = ({
  children,
  onClick,
  htmlType = "button",
  type,
  danger,
  isLoading,
  shape,
  icon,
}) => {
  return (
    <div className={styles.customButton}>
      <Button
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={isLoading}
        shape={shape}
        icon={icon}
        onClick={onClick}
      >
        
      </Button>
      {children}
    </div>
  );
};
