import faker from "faker";
import groupsRepository from "src/modules/v1/customers/repositories/groups";
import helper from "src/common/helper";
import queryFilter from "src/common/filter-query";
const controller = {};
/**
 * group list to display Groups in paginaion
 * 
 * Serach options: URL?search[field_name]=text
 * Search options for relationship: URL?search[model_name.field_name]=text
 * For example: URL?search[company_name]=gts
 * 
 * Filter option: URL?filter[field_name1]=example&filter[field_name2]=123456789
 * Filter option with relationship: URL?filter[model_name1.field_name1]=example&filter[model_name2.field_name2]=123456789
 * For example: URL?filter[company_name]=GTS Vietnam
 * 
 * Sort option: URL?sort=[{"field":"field_name","direction":"desc"}]
 * Sort option with relationship: URL?sort=[{"field":"model_name.field_name","direction":"desc"}]
 * For example: URL?sort=[{"field":"company_name","direction":"desc"}]
 * 
 * Paginate option: URL?page=number_of_page and default limit is 30 record
 * For example: URL?page=5
 * @param {*} req
 * @param {*} res
 */
controller.index = (req, res) => {
    let groupsRepos = new groupsRepository();
    const queryOptions = queryFilter(req.query);
    // res.json(queryOptions);
    groupsRepos
        .paginate(queryOptions)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "Groups.list.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
controller.show = (req, res) => {
    const options = {
        where: { id: req.params.id }
    };
    let groupsRepos = new groupsRepository();
    groupsRepos.findOne(options)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "group.display.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
};
/**
 * group creation to allow insert group's information into database
 * @param {*} req 
 * @param {*} res 
 */
controller.create = (req, res) => {
    let groupsRepos = new groupsRepository();
    groupsRepos.create(req.body)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "group.create.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
}
/**
 * group updation to allow update group's information via some conditions
 * Exampple here we can update group via ID 
 * @param {*} req 
 * @param {*} res 
 */
controller.update = (req, res) => {
    const options = {
        where: { id: req.params.id }
    };
    const groupInfo = req.body;
    //Init model via respository
    let groupsRepos = new groupsRepository();
    //update group's info by ID
    groupsRepos.update(groupInfo, options)
        .then(() => {
            //Find the group updated
            groupsRepos.findOne(options)
                .then(data => {
                    return res.json(
                        helper.formatOutputData(data, "group.update.success")
                    );
                })
                .catch(err => {
                    return res.status(400).json(helper.displayErrorMessage(err));
                });
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
}
/**
 * group deletion to allow delete one or more group's information via conditions
 * @param {*} req 
 * @param {*} res 
 */
controller.delete = (req, res) => {
    /**
     * Set where options to query delete
     * You can be added more conditions for example: where: [{ id: 1 }, { name: 'Henry Tran' }] into 'where' options is array value.
     * 
     */
    res.json({
        data: req.query
    });
    const options = {
        where: { id: req.params.id },
    };
    let groupsRepos = new groupsRepository();
    groupsRepos.destroy(options)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "group.delete.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
}

/**
 * group deletion to allow delete one or more group's information via conditions
 * @param {*} req 
 * @param {*} res 
 */
controller.restore = (req, res) => {
    /**
     * Set where options to query restore
     * You can be added more conditions for example: where: [{ id: 1 }, { name: 'Henry Tran' }] into 'where' options is array value.
     * 
     */
    const options = {
        where: { id: req.params.id },
    };
    let groupsRepos = new groupsRepository();
    groupsRepos.restore(options)
        .then(data => {
            return res.json(
                helper.formatOutputData(data, "group.restore.success")
            );
        })
        .catch(err => {
            return res.status(400).json(helper.displayErrorMessage(err));
        });
}

export default controller;
