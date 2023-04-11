// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract GalleryContract {
    struct Image {
        string url;
        string title;
        string description;
    }

    struct UserData {
        string name;
        string uid;
        Image[] imageList;
    }

    UserData[] users;

    function createUser(string memory name, string memory uid) public {
        UserData storage newUser = users.push();
        newUser.name = name;
        newUser.uid = uid;
        users.push(newUser);
    }

    function uploadedImage(
        string memory title,
        string memory description,
        string memory url,
        string memory uid
    ) public {
        for (uint i = 0; i < users.length; i++) {
            if (
                keccak256(abi.encodePacked(users[i].uid)) ==
                keccak256(abi.encodePacked(uid))
            ) {
                users[i].imageList.push(Image(url, title, description));
                return;
            }
        }
        revert("User not found");
    }

    function getAllUser() public view returns (UserData[] memory) {
        return users;
    }

    function getCurrentUser(
        string memory uid
    ) public view returns (UserData memory) {
        for (uint i = 0; i < users.length; i++) {
            if (
                keccak256(abi.encodePacked(users[i].uid)) ==
                keccak256(abi.encodePacked(uid))
            ) {
                return users[i];
            }
        }
        revert("User not found");
    }
}
