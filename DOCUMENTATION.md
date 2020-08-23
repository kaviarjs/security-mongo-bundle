In this bundle we're overriding the persistence layers from SecurityBundle to make them work with MongoBundle.

## Install

```bash
npm i -S @kaviar/security-bundle @kaviar-security-mongo-bundle
```

```js
import { SecurityBundle } from "@kaviar/security-bundle";
import { SecurityMongoBundle } from "@kaviar/security-mongo-bundle";
import { MongoBundle } from "@kaviar/mongo-bundle";

kernel.addBundles([
  // Make sure you have both security and mongo bundle in your kernel
  new SecurityBundle({
    // options
  }),
  new MongoBundle({
    uri: "your mongo url",
  }),

  // Order doesn't really matter.
  new SecurityMongoBundle(),
]);
```

## Overriding

You have the option to make changes to your collection, for example if you user is linked to other collections or you simply want a different collectio name:

```typescript
import {
  UsersCollection,
  PermissionsCollection,
} from "@kaviar/security-mongo-bundle";
import { IUser } from "@kaviar/security-bundle";

// We make the type behave with all of our needs
interface IAppUser extends IUser {
  profileId: ObjectID;
}

class AppUsersCollection extends UsersCollection<IAppUser> {
  static collectionName = "User"; // override it, by default it's users

  static links = {
    profile: {
      collection: () => ProfilesCollection,
      field: "profileId",
    },
  };

  static indexes = [
    {
      key: {
        profileId: 1,
      },
    },
  ];
}
```

```typescript
new SecurityMongoBundle({
  usersCollection: AppUsersCollection,
});
```
