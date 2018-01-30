# Ionic for JHipster Blog Example
 
This example app shows how to use Ionic for JHipster to create a blog app. 

Please read [Use Ionic for JHipster to Create Mobile Apps with OIDC Authentication](https://developer.okta.com/blog/2018/01/30/jhipster-ionic-with-oidc-authentication) to see how this app was created.

**Prerequisites:** [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and [Node.js](https://nodejs.org/).

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage, and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone git@github.com:oktadeveloper/okta-ionic-jhipster-example.git
cd okta-ionic-jhipster-example
```

This will get a copy of the project installed locally. To install all of its dependencies and start each app, follow the instructions below.

To run the server, cd into the `blog` folder and run:
 
```bash
npm install
yarn webpack:build
./gradlew
```

To run the Ionic app, cd into the `ionic4j` folder and run:
 
```bash
ionic serve
```

To run it in iOS emulator:

```bash
ionic cordova emulate ios
```

### Create an OIDC App in Okta

Log in to your Okta Developer account and navigate to **Applications** > **Add Application**. Click **Web** and click the **Next** button. Give the app a name you’ll remember, specify `http://localhost:8080` as a Base URI, and the following as a **Login redirect URI** and **Logout redirect URI**.

* `http://localhost:8080/login`
* `http://localhost:8100`
* `http://localhost:8888/login`

Click **Done** and you should see a client ID and client secret on the next screen. Edit the **General Settings** of your application and enable "Implicit (Hybrid)" grant type, and check the two boxes below it. Implicit flow needs to be allowed for your Ionic to authenticate.

Copy the client ID and secret into `blog/src/main/resources/config/application.yml`, replacing the default `security.oauth2.*` property values.

```yaml
security:
   basic:
       enabled: false
   oauth2:
       client:
           access-token-uri: https://{yourOktaDomain}.com/oauth2/default/v1/token
           user-authorization-uri: https://{yourOktaDomain}.com/oauth2/default/v1/authorize
           client-id: {yourClientId}
           client-secret: {yourClientSecret}
           client-authentication-scheme: form
           scope: openid profile email
       resource:
           filter-order: 3
           user-info-uri: https://{yourOktaDomain}.com/oauth2/default/v1/userinfo
           token-info-uri: https://{yourOktaDomain}.com/oauth2/default/v1/introspect
           prefer-token-info: false
```

On Okta, navigate to **Users** > **Groups**. Create `ROLE_ADMIN` and `ROLE_USER` groups and add your account to them.

**TIP:** If you've installed e2e tests with Protractor, you'll need to modify them to use an Okta account when running integration tests. Change the default credentials in `src/test/javascript/e2e/account/account.spec.ts` and `src/test/javascript/e2e/admin/administration.spec.ts`.

Navigate to **API** > **Authorization Servers**, click the **Authorization Servers** tab and edit the default one. Click the **Claims** tab and **Add Claim**. Name it "groups" or "roles", and include it in the ID Token. Set the value type to "Groups" and set the filter to be a Regex of `.*`.

## Links

This example uses the following libraries provided by Okta:

* [Ionic for JHipster](https://github.com/oktadeveloper/generator-jhipster-ionic)

## Help

Please post any questions as comments on the [blog post](), or visit our [Okta Developer Forums](https://devforum.okta.com/). You can also email developers@okta.com if would like to create a support ticket.

## License

Apache 2.0, see [LICENSE](LICENSE).
