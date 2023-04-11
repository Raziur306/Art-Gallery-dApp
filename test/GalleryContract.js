const { expect } = require('chai');
const { ethers } = require('hardhat');
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe('Gallery Contract', () => {
    //test variables
    const name = "Ronju";
    const title = "Image Title";
    const description = "Image Desciption";
    const uid = "xyzaba123454";
    const url = "http://image.png";

    async function deployCoffeeFixture() {
        const GalleryContract = await ethers.getContractFactory("GalleryContract");
        const hardhatGallery = await GalleryContract.deploy();
        await hardhatGallery.deployed();
        return { GalleryContract, hardhatGallery };
    }

    //save user test
    it('Save user with user id and name', async () => {
        const { GalleryContract, hardhatGallery } = await loadFixture(deployCoffeeFixture);
        await hardhatGallery.createUser(name, uid)

        // function testing 
        const user = await hardhatGallery.getCurrentUser(uid);
        expect(user.uid).to.equal(uid)
        expect(user.name).to.equal(name)
    });


    //save user test
    it('Save image url & get image url', async () => {
        const { GalleryContract, hardhatGallery } = await loadFixture(deployCoffeeFixture);
        await hardhatGallery.createUser(name, uid)
        await hardhatGallery.uploadedImage(title, description, url, uid)
        const user = await hardhatGallery.getCurrentUser(uid);
        expect(user.imageList[0].url).to.equal(url);
    });




});
