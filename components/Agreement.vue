<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" width="600px">
        <v-btn color="orange" dark slot="activator">Terms and Conditions</v-btn>
        <!-- <v-btn flat icon color="darken-2" slot="activator">
            <v-icon>visibility</v-icon>
        </v-btn> -->
        <v-card>
        <v-card-title>
          <span class="headline">Terms and Conditions</span>
        </v-card-title>
        <v-card-text class="text-xs-left">
        <p>By visiting the https://sign-me-out.firebaseapp.com from here on refered to as <em>{{name}}</em>, viewing, accessing or otherwise using any of the services or information created, collected, compiled or submitted to <em>{{name}}</em>, you agree to be bound by the following Terms and Conditions of Service. If you do not want to be bound by our Terms your only option is not to visit, view or otherwise use the services of <em>{{name}}</em>. You understand, agree and acknowledge that these Terms constitute a legally binding agreement between you and <em>{{name}}</em> and that your use of {{name}} shall indicate your conclusive acceptance of this agreement.</p>

        <h5>Provision of Services</h5>
        <p>You agree and acknowledge that <em>{{name}}</em> is entitled to modify, improve or discontinue any of its services at its sole discretion and without notice to you even if it may result in you being prevented from accessing any information contained in it. Furthermore, you agree and acknowledge that <em>{{name}}</em> is entitled to provide services to you through subsidiaries or affiliated entities.</p>

        <h5>Proprietary Rights</h5>
        <p>You acknowledge and agree that <em>{{name}}</em> may contain proprietary and confidential information including trademarks, service marks and patents protected by intellectual property laws and international intellectual property treaties. Our content may not be sold, reproduced, or distributed without our written permission. Any third-party trademarks, service marks and logos are the property of their respective owners. Any further rights not specifically granted herein are reserved.</p>

        <h5>Submitted Content</h5>
        <p>When you submit content to <em>{{name}}</em> you simultaneously grant <em>{{name}}</em> an irrevocable, worldwide, royalty free license to publish, display, modify, distribute and syndicate your content worldwide. You confirm and warrant that you have the required authority to grant the above license to <em>{{name}}</em>.</p>

        <h5>Termination of Agreement</h5>
        <p>The Terms of this agreement will continue to apply in perpetuity until terminated by either party without notice at any time for any reason. Terms that are to continue in perpetuity shall be unaffected by the termination of this agreement.</p>

        <h5>Disclaimer of Warranties</h5>
        <p>You understand and agree that your use of <em>{{name}}</em> is entirely at your own risk and that our services are provided "As Is" and "As Available". <em>{{name}}</em> does not make any express or implied warranties, endorsements or representations whatsoever as to the operation of the <em>{{name}}</em>, information, content, materials, or products. This shall include, but not be limited to, implied warranties of merchantability and fitness for a particular purpose and non-infringement, and warranties that access to or use of the service will be uninterrupted or error-free or that defects in the service will be corrected.</p>

        <h5>Limitation of Liability</h5>
        <p>You understand and agree that <em>{{name}}</em> and any of its subsidiaries or affiliates shall in no event be liable for any direct, indirect, incidental, consequential, or exemplary damages. This shall include, but not be limited to damages for loss of profits, business interruption, business reputation or goodwill, loss of programs or information or other intangible loss arising out of the use of or the inability to use the service, or information, or any permanent or temporary cessation of such service or access to information, or the deletion or corruption of any content or information, or the failure to store any content or information. The above limitation shall apply whether or not <em>{{name}}</em> has been advised of or should have been aware of the possibility of such damages. In jurisdictions where the exclusion or limitation of liability for consequential or incidental damages is not allowed the liability of <em>{{name}}</em> is limited to the greatest extent permitted by law.</p>

        <h5>External Content</h5>
        <p><em>PELM</em> may include hyperlinks to third-party content, advertising or websites. You acknowledge and agree that <em>PELM</em> is not responsible for and does not endorse any advertising, products or resource available from such resources or websites.</p>

        <h5>Jurisdiction</h5>
        <p>You expressly understand and agree to submit to the personal and exclusive jurisdiction of the courts of the country, state, province or territory determined solely by <em>PELM</em> to resolve any legal matter arising from this agreement or related to your use of <em>PELM</em>. If the court of law having jurisdiction, rules that any provision of the agreement is invalid, then that provision will be removed from the Terms and the remaining Terms will continue to be valid.</p>

        <h5>Entire Agreement</h5>
        <p>You understand and agree that the above Terms constitute the entire general agreement between you and <em>PELM</em>. You may be subject to additional Terms and conditions when you use, purchase or access other services, affiliate services or third-party content or material.</p>

        <h5>Changes to the Terms</h5>
        <p><em>PELM</em> reserves the right to modify these Terms from time to time at our sole discretion and without any notice. Changes to our Terms become effective on the date they are posted and your continued use of <em>PELM</em> after any changes to Terms will signify your agreement to be bound by them.</p>

        </v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">Agree</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
    export default{
        name: 'smo-agreement',
        data(){
            return{
               dialog: false,
               name : "SMO"
            }
        },
        mounted(){

        }

    }

</script>

<style scoped>

</style>