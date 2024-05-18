const defaultRoles = [
  {
    name: 'admin',
    permissions: [
      'manage_users',
      'view_students',
      'add_students',
      'edit_students',
      'remove_students',
    ]
  },
  {
    name: 'staff',
    permissions: [
      'view_students',
      'add_students',
      'edit_students',
      'remove_students',
    ]
  },
  {
    name: 'parent',
    permissions: [
      'view_students'
    ]
  }
];

module.exports = defaultRoles;