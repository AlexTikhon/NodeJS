import { GroupService } from "../../service/group.service.mjs";

export class GroupController {
  static async getAllGroups(_, res) {
    const groups = await GroupService.getAllGroups();

    res.status(200).json(groups);
    return groups;
  }

  static async getGroupByID(req, res) {
    const group = await GroupService.getGroupByID(req);

    if (group) {
      res.status(200).json(group);
    } else {
      res.status(404).json({
        type: "Error",
        message: `Group with id:${req.params.id} not found`,
      });
    }
  }

  static async createGroup(req, res) {
    const group = await GroupService.createGroup(req);

    res.status(201).json(group);
    return group;
  }

  static async addUserToGroup(req, res) {
    const result = await GroupService.addUserToGroup(req);

    res.status(201).json(result);
  }

  static async removeGroup(req, res) {
    const isRemoved = await GroupService.removeGroup(req);

    if (isRemoved) {
      res.status(200).json("Done");
    } else {
      res.status(404).json({
        type: "Error",
        message: `Group with id:${req.params.id} not found`,
      });
    }
  }

  static async removeUserFromGroup(req, res) {
    const isRemoved = await GroupService.removeUserFromGroup(req);

    if (isRemoved) {
      res.status(200).json("Done");
    } else {
      res.status(404).json({
        type: "Error",
        message: `Group with id:${req.params.id} not found`,
      });
    }
  }

  static async updateGroup(req, res) {
    const updatedGroup = await GroupService.updateGroup(req);

    if (updatedGroup[0]) {
      res.status(200).json("Done");
    } else {
      res.status(404).json({
        type: "Error",
        message: `Group with id:${req.params.id} not found`,
      });
    }
  }
}
