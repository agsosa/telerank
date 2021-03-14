/* eslint-disable no-shadow */
/* eslint-disable camelcase */

// Original source https://github.com/alik0211/mtproto-core/blob/master/docs/authentication.md

import { getSRPParams } from "@mtproto/core";
import TelegramSecrets from "./TelegramSecrets";
import * as TelegramProto from "./TelegramProto";

const { phone, password, code } = TelegramSecrets;

async function getUser() {
  try {
    const user = await TelegramProto.api.call("users.getFullUser", {
      id: {
        _: "inputUserSelf",
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}

function sendCode(phone: string) {
  return TelegramProto.api.call("auth.sendCode", {
    phone_number: phone,
    settings: {
      _: "codeSettings",
    },
  });
}

function signIn(code: any, phone: any, phone_code_hash: any) {
  return TelegramProto.api.call("auth.signIn", {
    phone_code: code,
    phone_number: phone,
    phone_code_hash,
  });
}

function getPassword() {
  return TelegramProto.api.call("account.getPassword", {});
}

function checkPassword(srp_id: any, A: any, M1: any) {
  return TelegramProto.api.call("auth.checkPassword", {
    password: {
      _: "inputCheckPasswordSRP",
      srp_id,
      A,
      M1,
    },
  });
}

export default async function Auth(): Promise<void> {
  const user = await getUser();

  if (!user) {
    const { phone_code_hash } = await sendCode(phone);

    try {
      const authResult = await signIn(code, phone, phone_code_hash);

      // console.log(`authResult:`, authResult);
    } catch (error) {
      if (error.error_message !== "SESSION_PASSWORD_NEEDED") {
        return;
      }

      // 2FA
      const { srp_id, current_algo, srp_B } = await getPassword();
      const { g, p, salt1, salt2 } = current_algo;

      const { A, M1 } = await getSRPParams({
        g,
        p,
        salt1,
        salt2,
        gB: srp_B,
        password,
      });

      const authResult = await checkPassword(srp_id, A, M1);

      // console.log(`authResult:`, authResult);
    }
  }
}
