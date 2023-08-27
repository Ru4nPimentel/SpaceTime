import { api } from "@/components/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const {searchParams} = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResponse = await api.post('/register', {
    code
  })

  const {token} = registerResponse.data


  //?? se existir o primeiro parametro ele executa ele caso contrario o proximo
  const redirectURL = redirectTo ?? new URL('/', request.url)

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30;

  return NextResponse.redirect(redirectURL, { 
    headers: { //Path=/ significa que esse cookie vai está disponivel em toda aplicação
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`
    }
  })
}