import BaseRepository from "src/database/baseRepository";
import models from "src/database/Initialize";
class GroupsRepository extends BaseRepository {
    get model() {
        return models.Groups;
    }
}

export default GroupsRepository;
