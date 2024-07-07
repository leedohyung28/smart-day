const dotenv = require("dotenv");
dotenv.config();
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const ensureAuthorization = require("../auth");

// 메인페이지 location, nickname 조회
// const getUser = (req, res) => {
//   ensureAuthorization(req, res, () => {
//     // 인증 성공 시 실행될 코드
//     const sql = `SELECT location, nickname FROM users WHERE email = ?`;

//     conn.query(sql, req.authorization.email, (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(StatusCodes.BAD_REQUEST).end();
//       }

//       if (results.length === 0) {
//         return res.status(StatusCodes.NOT_FOUND).json({
//           message: "사용자 정보를 찾을 수 없습니다.",
//         });
//       }

//       return res.status(StatusCodes.OK).json(results[0]);
//     });
//   });
// };

// 회원 정보 수정창 email, nickname, location 조회, 메인페이지 nickname, location 조회
const getUser = (req, res) => {
  ensureAuthorization(req, res, () => {
    // 인증 성공 시 실행될 코드
    const sql = `SELECT email, nickname, location FROM users WHERE email = ?`;

    conn.query(sql, req.authorization.email, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results.length > 0) {
        return res.status(StatusCodes.OK).json(results[0]);
      } else {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "사용자 정보를 찾을 수 없습니다.",
        });
      }
    });
  });
};

const join = (req, res) => {
  const { email, password, location, nickname } = req.body;

  const sql = `INSERT INTO users (email, password, salt, location, nickname) VALUES (?, ?, ?, ?, ?)`;

  const salt = crypto.randomBytes(16).toString("base64");
  const hashPassword = hashPassword(password, salt);

  const values = [email, hashPassword, salt, location, nickname];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.affectedRows === 0) {
      return res.status(StatusCodes.CREATED).json(results);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;

  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.length === 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
          message: "아이디 또는 비밀번호를 잘못 입력했습니다.",
        })
        .end();
    }

    const loginUser = results[0];

    // salt값 꺼내서 날 것으로 들어온 비밀번호 암호화
    const hashPassword = hashPassword(password, loginUser.salt);

    // 위에서 암호화된 비밀번호 db 비밀번호랑 비교
    if (loginUser && loginUser.password == hashPassword) {
      const access_token = jwt.sign(
        {
          id: loginUser.id,
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: process.env.TOKEN_EXPIRED_TIME,
          issuer: "SmartDay",
        }
      );

      res.cookie("access_token", access_token, {
        httpOnly: true,
      });

      return res.status(StatusCodes.OK).json(results);
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
          message: "아이디 또는 비밀번호를 잘못 입력했습니다.",
        })
        .end();
    }
  });
};

// 회원 정보 수정
const updateUserInformation = (req, res) => {
  const { location, nickname } = req.body;

  ensureAuthorization(req, res, () => {
    const sql = `UPDATE users SET location=?, nickname=? WHERE email=?`;

    const values = [location, nickname, req.authorization.email];
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      return res.status(StatusCodes.OK).json(results);
    });
  });
};

const hashPassword = (password, salt) => {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");
};

module.exports = {
  getUser,
  getInfoToUpdate,
  join,
  login,
  updateUserInformation,
};
