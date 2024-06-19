import Users from "./Users.js";
import Todos from "./Todos.js";
import Shared from "./Shared.js";
import HeardFrom from "./HeardFrom.js";

Users.hasMany(Todos, { as: "creator", foreignKey: "creatorId" });
Users.hasMany(HeardFrom, { as: "user", foreignKey: "userId" });
Users.hasMany(Shared, { as: "owner", foreignKey: "creatorId" });
Users.hasMany(Shared, { as: "sharedWith", foreignKey: "userId" });

Todos.belongsTo(Users, { as: "creator", foreignKey: "creatorId" });

Shared.belongsTo(Users, { as: "owner", foreignKey: "ownerId" });
Shared.belongsTo(Users, { as: "sharedWith", foreignKey: "sharedWithId" });

HeardFrom.belongsTo(Users, { as: "user", foreignKey: "userId" });

export { Users, Todos, Shared, HeardFrom };
