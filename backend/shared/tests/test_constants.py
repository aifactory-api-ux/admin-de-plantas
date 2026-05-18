import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..'))

import pytest
from backend.shared.constants import GERMINATION_STATUSES, ROLES, NOTIFICATION_TYPES, REPORT_TYPES


class TestSharedConstants:

    def test_roles_constants_are_defined_and_correct(self):
        assert hasattr(sys.modules['backend.shared.constants'], 'ROLES'), "ROLES constant not found"
        roles = list(ROLES)
        assert set(roles) == {'admin', 'user'}, f"Expected roles {{'admin', 'user'}}, got {set(roles)}"

    def test_germination_status_constants_are_defined_and_correct(self):
        assert hasattr(sys.modules['backend.shared.constants'], 'GERMINATION_STATUSES'), "GERMINATION_STATUSES constant not found"
        statuses = list(GERMINATION_STATUSES)
        assert set(statuses) == {'pending', 'germinated', 'failed'}, f"Expected statuses {{'pending', 'germinated', 'failed'}}, got {set(statuses)}"

    def test_notification_type_constants_are_defined_and_correct(self):
        assert hasattr(sys.modules['backend.shared.constants'], 'NOTIFICATION_TYPES'), "NOTIFICATION_TYPES constant not found"
        types = list(NOTIFICATION_TYPES)
        assert set(types) == {'info', 'warning', 'success', 'error'}, f"Expected types {{'info', 'warning', 'success', 'error'}}, got {set(types)}"

    def test_report_type_constants_are_defined_and_correct(self):
        assert hasattr(sys.modules['backend.shared.constants'], 'REPORT_TYPES'), "REPORT_TYPES constant not found"
        types = list(REPORT_TYPES)
        assert set(types) == {'germination-summary', 'plant-status'}, f"Expected types {{'germination-summary', 'plant-status'}}, got {set(types)}"

    def test_constants_are_immutable(self):
        import tuple as _tuple
        with pytest.raises(TypeError):
            ROLES.append('superadmin')
        with pytest.raises(TypeError):
            GERMINATION_STATUSES.append('unknown')

    def test_constants_do_not_contain_unexpected_values(self):
        assert list(ROLES) == ['admin', 'user']
        assert list(GERMINATION_STATUSES) == ['pending', 'germinated', 'failed']
        assert list(NOTIFICATION_TYPES) == ['info', 'warning', 'success', 'error']
        assert list(REPORT_TYPES) == ['germination-summary', 'plant-status']