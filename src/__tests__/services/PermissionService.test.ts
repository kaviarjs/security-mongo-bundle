import { SecurityService, PermissionService } from "@kaviar/security-bundle";
import { permissionServiceTestDefinitions } from "@kaviar/security-bundle/dist/__tests__/reusable";
import { ecosystem } from "../ecosystem";

permissionServiceTestDefinitions.forEach(({ message, test: testFunction }) => {
  test(`[Permissions] ${message}`, async () => {
    const { container, teardown, cleanup } = await ecosystem;
    const service = container.get(PermissionService);

    await testFunction(service);
    await cleanup();
  });
});
