import Wishlist from '../models/wishlist';

const _getWishlistCost = (list) => {
  // Accept list as Array of objects
  // Should return a single cost for the entire wishlist
  let totalCost = 0;

  list.forEach((item) => {
    totalCost += item.itemCost * item.itemQuantity;
  });

  return totalCost;
};

export const addItem = (req, res) => {
  // Bad request if no body is sent
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      Error: 'Body missing data',
    });
  }

  const familyId = req.params.familyId;
  const item = req.body.item;

  // TODO: Check structure of item
  // Prevent duplicate items
  Wishlist.find({ family: familyId }).exec((err, wishlist) => {
    if (err) {
      res.status(500).json({ Error: err });
    }

    wishlist[0].list.push(item);

    wishlist[0].totalListCost = _getWishlistCost(wishlist[0].list);

    wishlist[0].save((err, wishlist) => {
      if (err) {
        res.status(500).json({ Error: err });
      }

      res.status(201).json({
        message: 'Successfully added item to wishlist',
        wishlist: wishlist,
      });
    });
  });
};

export const create = (req, res) => {
  // Bad request if no body is sent
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      Error: 'Body missing data',
    });
  }

  const familyId = req.params.familyId;
  const newWishlist = req.body.list;

  // Check newWishlist object type is an Array
  // Single items should still reside in an Array

  Wishlist.where({ family: familyId }).exec((err, wishlist) => {
    if (err) {
      res.status(500).json({ Error: err });
    }

    if (wishlist[0].list !== []) {
      return res.status(200).json({
        Message: 'Unable to create wishlist. Wishlist already exists.',
      });
    }

    wishlist[0].list = newWishlist;

    wishlist[0].totalListCost = _getWishlistCost(wishlist[0].list);

    wishlist[0].save((err, wishlist) => {
      if (err) {
        res.status(500).json({ Error: err });
      }

      res.status(200).json({
        message: 'Successfully added new wishlist to family.',
        wishlist: wishlist,
      });
    });
  });
};

// export const delete = (req, res) => {
//   res.send('NOT YET IMPLEMENTED');
// };

export const removeItem = (req, res) => {
  // Bad request if no body is sent
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      Error: 'Body missing data',
    });
  }

  const familyId = req.params.familyId;
  const { itemName } = req.body.item;
  const itemId = req.body.itemId;

  Wishlist.where({ family: familyId })
    .findOne({
      'list.itemName': itemName,
      'list._id': itemId,
    })
    .exec((err, wishlist) => {
      if (err) {
        res.status(500).json({ Error: err });
      }

      if (!wishlist) {
        return res.status(400).send('No wishlist found containing that itemId');
      }

      wishlist.list = wishlist.list.filter(
        (item) => item._id.toString() !== itemId
      );

      wishlist.totalListCost = _getWishlistCost(wishlist.list);

      wishlist.save((err, wishlist) => {
        if (err) {
          res.status(500).json({ Error: err });
        }

        res.status(200).json({
          message: 'Successfully removed item from wishlist',
          wishlist: wishlist,
        });
      });
    });
};

export const updateItem = (req, res) => {
  // Bad request if no body is sent
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      Error: 'Body missing data',
    });
  }

  const familyId = req.params.familyId;
  const { itemName, itemCost, itemQuantity } = req.body.item;
  const itemId = req.body.itemId;

  Wishlist.where({ family: familyId })
    .findOne({
      'list._id': itemId,
    })
    .exec((err, wishlist) => {
      if (err) {
        res.status(500).json({ Error: err });
      }

      wishlist.list.map((item) => {
        if (item._id.toString() === itemId) {
          item.itemName = itemName ? itemName : item.itemName;
          item.itemCost = itemCost ? itemCost : item.itemCost;
          item.itemQuantity = itemQuantity ? itemQuantity : item.itemQuantity;
        }
      });

      wishlist.totalListCost = _getWishlistCost(wishlist.list);

      wishlist.save((err, wishlist) => {
        if (err) {
          res.status(500).json({ Error: err });
        }

        res.status(200).json({
          message: 'Successfully updated item in wishlist',
          wishlist: wishlist,
        });
      });
    });
};
