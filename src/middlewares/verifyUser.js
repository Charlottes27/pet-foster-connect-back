import {Association, Family, User} from "../models/index.js";

export function verifyFamily () {
    return async function (req, res, next) {
        const familyId = req.params.id;
        const family = await Family.findByPk(familyId);
        if (!family) {
            return res.status(404).json({
                error: "Profil famille non trouvé"
            });
        }
        const familyUser = await family.getUser();
        if (familyUser.id !== req.user.id) {
            return res.status(403).json({
                error: "Accès interdit: Vous n'etes pas habilité"
            });
        }
        next();
    };
};

export function verifyAssociation () {
    return async function (req, res, next) {
        const associationId = req.params.id || req.params.associationId;
        const association = await Association.findByPk(associationId);
        if (!association) {
            return res.status(404).json({
                error: "Profil association non trouvé"
            });
        }
        const associationUser = await association.getUser();
        if (associationUser.id !== req.user.id) {
            return res.status(403).json({
                error: "Accès interdit: Vous n'etes pas habilité"
            });
        }
        next();
    };
};

export function verifyUser() {
    return async function (req, res, next) {
        const userId = req.params.id || req.params.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                error: "Profil utilisateur non trouvé"
            });
        }
        
        if (user.id !== req.user.id) {
            return res.status(403).json({
                error: "Accès interdit: Vous n'etes pas habilité"
            });
        }
        next();
    };
};