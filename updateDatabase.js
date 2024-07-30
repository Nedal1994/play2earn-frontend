const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://sadhunitish:RKPnAJKCQMK2A6Vd@cluster0.ms0bxut.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function updateCaptchas() {
    try {
        await client.connect();
        const database = client.db('captcha_database');

        // Update text captchas
        const textCollection = database.collection('captcha_text');
        await textCollection.updateMany(
            { answer: 'smwm' },
            { $set: { url: 'smwm.png' } }
        );
        await textCollection.updateMany(
            { answer: 'RecAptChA' },
            { $set: { url: 'RecAptChA.jpeg' } }
        );
        await textCollection.updateMany(
            { answer: '4cz8JyAz' },
            { $set: { url: '4cz8JyAz.jpeg' } }
        );
        await textCollection.updateMany(
            { answer: 'CAPTCHA' },
            { $set: { url: 'CAPTCHA.gif' } }
        );
        await textCollection.updateMany(
            { answer: 'eX8MdT' },
            { $set: { url: 'eX8MdT.jpeg' } }
        );
        await textCollection.updateMany(
            { answer: 'wnB56n' },
            { $set: { url: 'wnB56n.jpeg' } }
        );

        // Update audio captchas
        const audioCollection = database.collection('captcha_audio');
        // Level 1
        await audioCollection.updateMany(
            { answer: 'jeep' },
            { $set: { url: 'jeep (2).mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'perfect' },
            { $set: { url: 'perfect (2).mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'flower' },
            { $set: { url: 'flower (2).mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'game' },
            { $set: { url: 'game (2).mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'music' },
            { $set: { url: 'music (2).mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'swimming' },
            { $set: { url: 'swimming (2).mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'beach' },
            { $set: { url: 'beach.mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'door' },
            { $set: { url: 'door (3).mp3' } }
        );
        // Level 2
        await audioCollection.updateMany(
            { answer: 'cup of tea' },
            { $set: { url: 'cup of tea.mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'here you are' },
            { $set: { url: 'here you are.mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'may i sit' },
            { $set: { url: 'may i sit (2).mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'this is a car' },
            { $set: { url: 'this is a car.mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'i love swimming' },
            { $set: { url: 'i love swimming.mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'children playing' },
            { $set: { url: 'children playing.mp3' } }
        );
        // Level 3
        await audioCollection.updateMany(
            { answer: 'the quiet library was filled with the faint rustling of pages as students immersed themselves in their studies.' },
            { $set: { url: 'the quiet library wa.mp3', answer: 'the quiet library was filled with the faint rustling of pages as students immersed themselves in their studies' } }
        );
        await audioCollection.updateMany(
            { answer: 'as the first snowflakes of winter fell children eagerly rushed outside to build snowmen' },
            { $set: { url: 'as the first snowfla.mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'the aroma of freshly brewed coffee filled the cafe creating a cozy atmosphere' },
            { $set: { url: 'the aroma of freshly.mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'the old tree in the park had witnessed countless seasons standing as a silent guardian over the years' },
            { $set: { url: 'the old tree in the .mp3' } }
        );
        await audioCollection.updateMany(
            { answer: 'the peaceful sound of waves lapping against the shore provided a calming backdrop to her thoughts' },
            { $set: { url: 'the peaceful sound o.mp3' } }
        );

        // Update image captchas
        const imageCollection = database.collection('captcha_images');
        const imageCaptchas = [
            // Level 1 Image CAPTCHAs
            {
                level: 'level1',
                question: "Select the correct image of a tree.",
                options: [
                    { imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flower_jtca001.jpg/1280px-Flower_jtca001.jpg", isCorrect: false },
                    { imageSrc: "https://cdn.pixabay.com/photo/2013/04/03/12/05/tree-99852_640.jpg", isCorrect: true },
                    { imageSrc: "https://cdn.pixabay.com/photo/2016/02/19/15/46/labrador-retriever-1210559_640.jpg", isCorrect: false }
                ]
            },
            {
                level: 'level1',
                question: "Select the correct image of a car.",
                options: [
                    { imageSrc: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW90b3JiaWtlfGVufDB8fDB8fHww", isCorrect: false },
                    { imageSrc: "https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_640.jpg", isCorrect: true },
                    { imageSrc: "https://static3.depositphotos.com/1000145/100/i/450/depositphotos_1007871-stock-photo-truck-road.jpg", isCorrect: false }
                ]
            },
            {
                level: 'level1',
                question: "Select the correct image of a dog.",
                options: [
                    { imageSrc: "https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J", isCorrect: true },
                    { imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Giraffe_standing.jpg/448px-Giraffe_standing.jpg", isCorrect: false },
                    { imageSrc: "https://hips.hearstapps.com/hmg-prod/images/cute-photos-of-cats-looking-at-camera-1593184780.jpg?crop=0.6672958942897593xw:1xh;center,top&resize=980:*", isCorrect: false }
                ]
            },
            {
                level: 'level1',
                question: "Select the correct image of a phone.",
                options: [
                    { imageSrc: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?cs=srgb&dl=pexels-fotios-photos-1092644.jpg&fm=jpg", isCorrect: true },
                    { imageSrc: "https://watermark.lovepik.com/photo/20211119/large/lovepik-laptop-and-mobile-phone-on-the-desktop-picture_500231129.jpg", isCorrect: false },
                    { imageSrc: "https://upload.wikimedia.org/wikipedia/commons/8/8d/HP_LaserJet_1020_printer.jpg", isCorrect: false }
                ]
            },
            // Level 2 Image CAPTCHAs
            {
                level: 'level2',
                question: "Select the correct image of a rose.",
                options: [
                    { imageSrc: "https://harkness-roses.s3.amazonaws.com/700/530920.jpg", isCorrect: true },
                    { imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Lilium_candidum_1.jpg/800px-Lilium_candidum_1.jpg", isCorrect: false },
                    { imageSrc: "https://www.chicagobotanic.org/sites/default/files/images/sunflowers/sunflower_big1.jpg", isCorrect: false }
                ]
            },
            {
                level: 'level2',
                question: "Select the correct image of a mango tree.",
                options: [
                    { imageSrc: "https://static.vecteezy.com/system/resources/previews/038/141/340/non_2x/ai-generated-mango-tree-in-park-generate-ai-photo.jpg", isCorrect: true },
                    { imageSrc: "https://i.pinimg.com/736x/46/59/10/465910dfb32ce73e94f211582fd257cd.jpg", isCorrect: false },
                    { imageSrc: "https://cdn.shopify.com/s/files/1/0059/8835/2052/products/Navel_Orange_1_FGT.jpg", isCorrect: false }
                ]
            },
            {
                level: 'level2',
                question: "Select the correct image of a monkey.",
                options: [
                    { imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Gorille_des_plaines_de_l%27ouest_%C3%A0_l%27Espace_Zoologique.jpg/800px-Gorille_des_plaines_de_l%27ouest_%C3%A0_l%27Espace_Zoologique.jpg", isCorrect: false },
                    { imageSrc: "https://api.hub.jhu.edu/factory/sites/default/files/styles/soft_crop_1300/public/monkey092018.jpg", isCorrect: true },
                    { imageSrc: "https://lazoo.org/wp-content/uploads/2023/05/Chimp-Female-Yoshi-Spotlight-JEP_1025-1024x731.jpg", isCorrect: false }
                ]
            },
            {
                level: 'level2',
                question: "Select the correct image of a lion.",
                options: [
                    { imageSrc: "https://i.natgeofe.com/k/07176791-9577-4e31-b101-b10ca7ca9a3c/Stripes_Tiger-Terrific_KIDS_0722_16x9.jpg", isCorrect: false },
                    { imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nagarhole_Kabini_Karnataka_India%2C_Leopard_September_2013.jpg/800px-Nagarhole_Kabini_Karnataka_India%2C_Leopard_September_2013.jpg", isCorrect: false },
                    { imageSrc: "https://c02.purpledshub.com/uploads/sites/62/2019/10/Federico_Veronesi_Lions-cover-image-e359a4e.jpg", isCorrect: true }
                ]
            },
            // Level 3 Image CAPTCHAs
            {
                level: 'level3',
                question: "Select the correct image of a stethoscope.",
                options: [
                    { imageSrc: "https://www.accoson.com/wp-content/uploads/2021/03/Physician-Black-Shadow.jpeg", isCorrect: true },
                    { imageSrc: "https://static.wixstatic.com/media/2ac255_fbcf1aff702345249d33956a84fa27cc~mv2.png/v1/fill/w_480,h_449,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2ac255_fbcf1aff702345249d33956a84fa27cc~mv2.png", isCorrect: false },
                    { imageSrc: "https://www.embs.org/pulse/wp-content/uploads/sites/13/2023/06/2-An-Injection-of-Innovation-How-Drug-Delivery-Systems-are-Changing-768x432.jpg", isCorrect: false }
                ]
            },
            {
                level: 'level3',
                question: "Select the correct image of sugar.",
                options: [
                    { imageSrc: "https://images.ctfassets.net/4f3rgqwzdznj/hFtcOUr8IbQ1S14dB8sw3/daa5240ab54583ca24495ca31301ea2c/closeup_hand_salt_shaker_1374938821.jpg", isCorrect: false },
                    { imageSrc: "https://cdn.britannica.com/73/239573-050-E9A4DB36/sugar-cubes.jpg", isCorrect: true },
                    { imageSrc: "https://foodtolive.com/healthy-blog/wp-content/uploads/sites/3/2020/06/Himalayan-Pink-Salt-850x500-2px.jpg", isCorrect: false }
                ]
            },
            {
                level: 'level3',
                question: "Select the correct image of a giraffe.",
                options: [
                    { imageSrc: "https://upload.wikimedia.org/wikipedia/commons/4/43/07._Camel_Profile%2C_near_Silverton%2C_NSW%2C_07.07.2007.jpg", isCorrect: false },
                    { imageSrc: "https://upload.wikimedia.org/wikipedia/commons/6/60/Equus_quagga.jpg", isCorrect: false },
                    { imageSrc: "https://rangerclub.be/assets/2.ANIMAUX/GIRAFE/_resampled/CroppedFocusedImageWzkyMCw1MTcuNSwieSIsNDdd-WWF-Rangerclub-Giraf-Girafe-6.jpg", isCorrect: true }
                ]
            },
            {
                level: 'level3',
                question: "Select the correct image of a horse.",
                options: [
                    { imageSrc: "https://cdn.britannica.com/68/143568-050-5246474F/Donkey.jpg", isCorrect: false },
                    { imageSrc: "https://premierperformance.uk/wp-content/uploads/2020/09/Depositphotos_62669707_l-2015.jpg", isCorrect: true },
                    { imageSrc: "https://upload.wikimedia.org/wikipedia/commons/6/60/Equus_quagga.jpg", isCorrect: false }
                ]
            },
        ];

        // Insert image captchas into the database
        await imageCollection.deleteMany({}); // Clear existing data
        await imageCollection.insertMany(imageCaptchas);

        console.log('Database updated successfully');
    } catch (error) {
        console.error('Error updating database:', error);
    } finally {
        await client.close();
    }
}

updateCaptchas();

