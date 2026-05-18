import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..'))

import pytest


class TestPlantController:

    @pytest.mark.asyncio
    async def test_get_plants_returns_list_of_plants(self):
        pass

    @pytest.mark.asyncio
    async def test_post_plants_creates_new_plant(self):
        pass

    @pytest.mark.asyncio
    async def test_post_plants_missing_required_field_returns_422(self):
        pass

    @pytest.mark.asyncio
    async def test_get_plant_by_id_returns_plant(self):
        pass

    @pytest.mark.asyncio
    async def test_get_plant_by_id_not_found_returns_404(self):
        pass

    @pytest.mark.asyncio
    async def test_patch_plant_updates_fields(self):
        pass

    @pytest.mark.asyncio
    async def test_patch_plant_invalid_status_returns_422(self):
        pass

    @pytest.mark.asyncio
    async def test_delete_plant_removes_plant(self):
        pass

    @pytest.mark.asyncio
    async def test_delete_plant_not_found_returns_404(self):
        pass

    @pytest.mark.asyncio
    async def test_get_plants_empty_returns_empty_list(self):
        pass