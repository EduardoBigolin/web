import axios from "axios";
import React, { useEffect } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "react-router-dom";
import IFLogo from "../../assets/IFLogo.svg";
import moment from "moment";
import "./card.css";

// import { Container } from './styles';

const Card: React.FC = () => {
  const authHeader = useAuthHeader();
  const auth = useAuthUser();
  const [userData, setUserData] = React.useState<any>([]);
  const { slug } = useParams<{ slug: string }>();
  const dia = moment().locale("pt-br");

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/api/v1/user/card/${
          slug != undefined ? (slug as string) : (auth()?.id as string)
        }`,
        {
          headers: {
            Authorization: `${authHeader()}`,
          },
        }
      )
      .then((response) => {
        setUserData(response.data.message);
        console.log(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(dia.format("dddd"));

  return (
    <div className="card-body">
      <div className="logo-container">
        <img src={IFLogo} alt={"logo do ifrs"} className={"logo"} />
      </div>
      <div className={"card-content"}>
        <h1>{userData.group}</h1>
        <div className={"user-content"}>
          <img
            src={`data:${userData.photoFile.mimetype};base64,${Buffer.from(
              userData.photoFile.file.data
            ).toString("base64")}`}
            className={"avatar"}
          />
          <span className={"student-name"}>{userData.name}</span>
          <span className={"birth-date"}>{userData.birth}</span>
        </div>
        {/* <div
          className={
            userData.hasLunch.includes() ? "authorized" : "not-authorized"
          }
        >
          {userData.hasLunch.includes() ? (
            <span>Almoço Liberado</span>
          ) : (
            <span>Almoço Não Liberado</span>
          )}
        </div> */}
      </div>
      <div className={"vertical-line"}></div>
      <div className={"qrCode-container"}>
        {slug != undefined ? (
          ""
        ) : (
          <QRCodeSVG
            className={"qrCode"}
            value={userData.link}
            imageSettings={{
              src: IFLogo,
              x: undefined,
              y: undefined,
              height: 35,
              width: 25,
              excavate: true,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
