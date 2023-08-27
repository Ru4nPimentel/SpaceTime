import { NextRequest, NextResponse } from "next/server";

const singInURL = `https:/github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if(!token) {
    return NextResponse.redirect(singInURL, { 
      headers: { //Path=/ significa que esse cookie vai está disponivel em toda aplicação
        //request.url url original utilizado
        // HttpOnly não deixa esse cookie disponivel para o usuario, apenas para o back-end do next
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20;`
      }
    })
  }

  return NextResponse.next() // esse NextResponse.next deixa o usuario seguir em frente
}

export const config = { 
  matcher: '/memories/:path*' //matcher em quais caminhos/endereço quero disparar esse middleware
  //esse middleware vai ser disparado toda vez que o usuario acessar essa rota
}