import UserEntity from "./userEntity"

class UserModel {
  public userId: number = Number()
  
  public carbon: number = Number()

  public userEntity: UserEntity = new UserEntity
}

export default UserModel