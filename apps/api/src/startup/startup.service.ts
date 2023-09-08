import LoansService from '@loans/loans.service';
import MaterialsService from '@materials/materials.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import NotificationsService from '@notifications/notifications.service';

@Injectable()
export default class StartupService implements OnModuleInit {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly loansService: LoansService,
    private readonly materialService: MaterialsService
  ) {}

  async onModuleInit() {
    await this.createNotifications();
    await this.loansService.verifyUsersReserve();
  }

  private async createNotifications() {
    await this.deletePreviousNotifications();
    const loanNotifications = await this.checkLoanService();
    const materialNotifications = await this.checkMaterialsService();
    const notifications = [...loanNotifications, ...materialNotifications];
    await this.notificationsService.createBatch(notifications);
  }

  private async deletePreviousNotifications() {
    await this.notificationsService.removeAll();
  }

  private async checkLoanService() {
    const overdueLoans = await this.loansService.getOverdueLoans();
    return overdueLoans.map(loan => ({
      name: 'Overdue Loan',
      notificationName: `Loan ${loan.loanId} is overdue`,
      notificationType: 'Loan',
      notificationContent: `Loan with ID ${loan.loanId} is overdue. Please take action.`
    }));
  }

  private async checkMaterialsService() {
    const lowStockMaterials = await this.materialService.getLowStockMaterials();
    return lowStockMaterials.map(material => ({
      name: 'Low Stock Material',
      notificationName: `Material ${material.materialId} has low stock`,
      notificationType: 'Material',
      notificationContent: `Material with ID ${material.materialId} has low stock. Please reorder.`
    }));
  }
}
