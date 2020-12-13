import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
const _IntuitOAuth = require('intuit-oauth');

import { OauthService } from './oauth.service';

@Controller('intuit/oauth')
export class OAuthController {
  constructor(
    @Inject('IntuitOAuth') private intuitOAuth: any,
    private oauthService: OauthService
  ) {}

  @Get('authorize')
  authorize(@Req() req: Request, @Res() res: Response) {
    const authUri = this.intuitOAuth.authorizeUri({
      scope: [_IntuitOAuth.scopes.Accounting],
      state: null,
    });
    return res.redirect(authUri);
  }

  @Get('redirect')
  authorizeRedirect(@Req() req: Request, @Res() res: Response) {
    try {
      const parseRedirect = req.url;
      this.intuitOAuth.createToken(parseRedirect).then((response) => {
        this.oauthService.emitToken(this.oauthService.buildToken(response));
        res.redirect('https://google.com');
      });
    } catch (err) {
      res.redirect('https://yahoo.com');
    }
  }
}
