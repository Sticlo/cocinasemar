import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ServicesComponent } from '../../components/services/services.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { WorkShowcaseComponent } from '../../components/work-showcase/work-showcase.component';
import { AboutComponent } from '../../components/about/about.component';
import { BenefitsComponent } from '../../components/benefits/benefits.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { DreamKitchenComponent } from '../../components/dream-kitchen/dream-kitchen.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { WhatsappFloatComponent } from '../../components/whatsapp-float/whatsapp-float.component';
import { AnimationToggleComponent } from '../../components/animation-toggle/animation-toggle.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    BenefitsComponent,
    WorkShowcaseComponent,
    GalleryComponent,
    AboutComponent,
    DreamKitchenComponent,
    ContactComponent,
    FooterComponent,
    WhatsappFloatComponent,
    AnimationToggleComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
