import helper from "src/common/helper";
import * as fs from "fs";
import { Console } from "console";
import objectAssign from "object-assign";
const controller = {};

/**
 * module generation
 * @param {*} req 
 * @param {*} res 
 */
controller.create = (req, res) => {
    const allDefine = helper.isValidJson(req.body.definition) ? JSON.parse(req.body.definition) : "";
    /**
     * validate and generate default folder in /build/generation that you will be generated modules
     */
    if (!fs.existsSync(__dirname + "/generation"))
        fs.mkdirSync(__dirname + "/generation");
    /**
     * Start generate modules base the definition config that you define by json config. 
     */
    Object.keys(allDefine).forEach(function (index) {
        Object.keys(allDefine[index]).forEach(function (key) {
            const moduleDefiition = allDefine[index][key];
            let modulePath = __dirname + "/generation/" + moduleDefiition.moduleName;
            !fs.existsSync(modulePath) ? fs.mkdirSync(modulePath) : false;
            /**
             * Controler creation
             */
            !fs.existsSync(modulePath) ? fs.mkdirSync(modulePath + '/controllers') : false;
            let controllerContent = "";
            // Read content of controler from template
            controllerContent = fs.readFileSync(process.cwd() + "/src/common/template/controllers/index.pug", { encoding: 'utf8', flag: 'r' });
            // Replace content for new controller
            controllerContent = controllerContent.replace(/{{moduleName}}/g, moduleDefiition.moduleName);
            // Write new controller file
            fs.writeFileSync(modulePath + '/controllers/' + moduleDefiition.moduleName + '.js', controllerContent, 'utf8', function (err) {
                if (err) return console.log(err);
            });

            /**
             * Router creation
             */
            !fs.existsSync(modulePath) ? fs.mkdirSync(modulePath + '/routes') : false;
            let routeContent = "";
            // Read content of route from template
            routeContent = fs.readFileSync(process.cwd() + "/src/common/template/routes/index.pug", { encoding: 'utf8', flag: 'r' });
            // Replace content for new route
            routeContent = routeContent.replace(/{{moduleName}}/g, moduleDefiition.moduleName);
            //Write new route file
            fs.writeFileSync(modulePath + '/routes/' + moduleDefiition.moduleName + '.js', routeContent, 'utf8', function (err) {
                if (err) return console.log(err);
            });

            /**
            * Router creation
            */
            !fs.existsSync(modulePath) ? fs.mkdirSync(modulePath + '/repositories') : false;
            let repositorieContent = "";
            // Read content of route from template
            repositorieContent = fs.readFileSync(process.cwd() + "/src/common/template/repositories/index.pug", { encoding: 'utf8', flag: 'r' });
            // Replace content for new route
            repositorieContent = repositorieContent.replace(/{{modelName}}/g, moduleDefiition.modelName);
            repositorieContent = repositorieContent.replace(/{{moduleName}}/g, moduleDefiition.moduleName);
            //Write new route file
            fs.writeFileSync(modulePath + '/repositories/' + moduleDefiition.moduleName + '.js', repositorieContent, 'utf8', function (err) {
                if (err) return console.log(err);
            });

            /**
             *  Model creation
             */
            !fs.existsSync(modulePath) ? fs.mkdirSync(modulePath + '/models') : false;
            let modelContent = "";
            // Read content of model from template
            modelContent = fs.readFileSync(process.cwd() + "/src/common/template/models/index.pug", { encoding: 'utf8', flag: 'r' });
            // Replace content for new model
            modelContent = modelContent.replace(/{{modelName}}/g, moduleDefiition.modelName);
            modelContent = modelContent.replace(/{{timestamps}}/g, moduleDefiition.timestemps);
            modelContent = modelContent.replace(/{{paranoid}}/g, moduleDefiition.paranoid);
            modelContent = modelContent.replace(/{{tableName}}/g, moduleDefiition.tableName);
            modelContent = modelContent.replace(/{{relationType}}/g, moduleDefiition.association.relationType);
            modelContent = modelContent.replace(/{{relationModel}}/g, moduleDefiition.association.relationModel);
            modelContent = modelContent.replace(/{{foreignKey}}/g, moduleDefiition.association.foreignKey);
            modelContent = modelContent.replace(/{{aliasName}}/g, moduleDefiition.association.aliasName);
            //Write new model file
            fs.writeFileSync(modulePath + '/models/' + moduleDefiition.moduleName + '.js', modelContent, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        });
    });
    res.json({ updated: allDefine });
}

export default controller;
