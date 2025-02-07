import { Injectable } from '@nestjs/common';
import { LoginRequestDto, RegisterRequestDto } from './dto/auth.dto';
import { ProfilesService } from '../profiles/profiles.service';
import { ProfileEntity } from '../profiles/entities/profile.entity';
import { DatabaseError, isApplicationError } from '@utils/error/errors';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly jwtService: JwtService,
  ) {}
  async register(
    registerRequestDto: RegisterRequestDto,
  ): Promise<ProfileEntity | DatabaseError> {
    // verifico l'esistenza del profilo <mail> (FindProfile)

    // Esiste?
    /**
     * -SI
     * -- Errore => Profilo già registrato
     *
     * -NO
     * -- Registro
     * -- Creo un Profilo
     
    */
    return await this.profilesService.create(registerRequestDto);
    /*
     * -- Mando la Mail
     * -- OK => Registrazione Registrata
     */
  }

  async login(loginRequestDto: LoginRequestDto) {
    // ottengo il profilo
    const profileResponse = await this.profilesService.findOneByEmail(
      loginRequestDto.email,
    );

    // verifico la password
    if (isApplicationError(profileResponse)) {
      return profileResponse;
    }
    if (profileResponse.password !== loginRequestDto.password) {
      return 'non ok';
    }
    return {
      access_token: this.jwtService.sign({ userId: profileResponse.id }),
    };
    //restituisco il token
  }
}
