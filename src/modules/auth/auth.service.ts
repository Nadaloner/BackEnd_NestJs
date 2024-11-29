import { Injectable } from '@nestjs/common';
import { RegisterRequestDto } from './dto/auth.dto';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class AuthService {
  constructor(private readonly profilesService: ProfilesService) {}
  register(registerRequestDto: RegisterRequestDto) {
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
    this.profilesService.create(registerRequestDto);
    /*
     * -- Mando la Mail
     * -- OK => Registrazione Registrata
     */
    return 'ti sei registrato';
  }
}
