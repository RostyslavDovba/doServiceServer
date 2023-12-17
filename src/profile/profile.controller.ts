import { Controller, Get, UseGuards } from '@nestjs/common';

import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guard/auth.guard';
import { ProfileService } from '@app/profile/profile.service';
import { ProfileType } from '@app/profile/types/profile.type';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get('profile')
  @UseGuards(AuthGuard)
  async getCurrentProfile(@User('id') userId: string): Promise<ProfileType> {
    return await this.profileService.getCurrentProfile(userId);
  }
}
